import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { getUserToken, isNewUser, markUserAsReturning } from '../../utils/userToken';
import type { N8nWebhookPayload, N8nWebhookResponse } from '../../types/chat';
import { useTracking } from '../../utils/posthog';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ContactFormData {
  name?: string;
  email: string;
  company?: string;
}

interface ContactChatProps {
  showHeader?: boolean;
  preFilledContent?: {
    message?: string;
    subject?: string;
    action?: 'audit' | 'quote' | 'demo' | 'contact';
  };
}

const N8N_WEBHOOK_URL = 'https://kevin133-20133.wykr.es/webhook/53b90858-0451-4042-8493-b086221b84d6/chat';

const ContactChat: React.FC<ContactChatProps> = ({ showHeader = true, preFilledContent }) => {
  const { t, ready } = useTranslation();
  const { trackForm, track } = useTracking();
  
  // Generate pre-filled message based on action
  const getPreFilledMessage = () => {
    if (!preFilledContent?.action) return preFilledContent?.message || '';
    
    const prompts = t('commandPalette.preFilledPrompts', { returnObjects: true }) as Record<string, string>;
    return prompts[preFilledContent.action] || preFilledContent.message || '';
  };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [userToken, setUserToken] = useState<string>('');
  const [isNewUserFlag, setIsNewUserFlag] = useState(true);
  const [captchaData, setCaptchaData] = useState({
    startTime: Date.now(),
    mouseMovements: 0,
    keystrokes: 0,
    focusTime: 0,
    lastActivity: Date.now()
  });
  const [captchaChallenge, setCaptchaChallenge] = useState<{
    question: string;
    answer: number;
    isActive: boolean;
  } | null>(null);

  // Funkcje CAPTCHA
  const updateCaptchaData = (field: keyof typeof captchaData, value: number) => {
    setCaptchaData(prev => ({
      ...prev,
      [field]: value,
      lastActivity: Date.now()
    }));
  };

  const validateCaptcha = (): boolean => {
    const now = Date.now();
    const timeOnPage = now - captchaData.startTime;
    const timeSinceLastActivity = now - captchaData.lastActivity;
    
    // Sprawdź czy użytkownik spędził wystarczająco dużo czasu na stronie (min 3 sekundy)
    if (timeOnPage < 3000) return false;
    
    // Sprawdź czy użytkownik był aktywny w ciągu ostatnich 30 sekund
    if (timeSinceLastActivity > 30000) return false;
    
    // Sprawdź czy użytkownik wykonał jakieś interakcje (ruch myszy lub klawiatura)
    if (captchaData.mouseMovements < 2 && captchaData.keystrokes < 5) return false;
    
    return true;
  };

  // Generowanie wyzwania CAPTCHA
  const generateCaptchaChallenge = () => {
    const challenges = [
      { question: "Ile to jest 7 + 3?", answer: 10 },
      { question: "Ile to jest 15 - 8?", answer: 7 },
      { question: "Ile to jest 4 × 2?", answer: 8 },
      { question: "Ile to jest 12 ÷ 3?", answer: 4 },
      { question: "Ile to jest 5 + 6?", answer: 11 },
      { question: "Ile to jest 20 - 9?", answer: 11 },
      { question: "Ile to jest 3 × 4?", answer: 12 },
      { question: "Ile to jest 18 ÷ 2?", answer: 9 }
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCaptchaChallenge({
      question: randomChallenge.question,
      answer: randomChallenge.answer,
      isActive: true
    });
    
    return randomChallenge;
  };

  // Sprawdzanie odpowiedzi CAPTCHA
  const checkCaptchaAnswer = (userAnswer: string): boolean => {
    if (!captchaChallenge) return false;
    
    const answer = parseInt(userAnswer.trim());
    const isCorrect = answer === captchaChallenge.answer;
    
    if (isCorrect) {
      setCaptchaChallenge(null);
      return true;
    }
    
    return false;
  };

  // Event listeners dla CAPTCHA
  useEffect(() => {
    const handleMouseMove = () => {
      updateCaptchaData('mouseMovements', captchaData.mouseMovements + 1);
    };

    const handleKeyPress = () => {
      updateCaptchaData('keystrokes', captchaData.keystrokes + 1);
    };

    const handleFocus = () => {
      updateCaptchaData('focusTime', Date.now());
    };

    // Dodaj event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('focus', handleFocus);
    };
  }, [captchaData.mouseMovements, captchaData.keystrokes]);

  // Inicjalizacja tokenu użytkownika przy montowaniu komponentu
  useEffect(() => {
    const token = getUserToken();
    const newUser = isNewUser();
    setUserToken(token);
    setIsNewUserFlag(newUser);
    
    // Zawsze wyświetl wiadomość powitalną - różną dla nowych i powracających użytkowników
    const welcomeMessage = newUser 
      ? t('chat.welcomeMessage')
      : t('chat.welcomeMessage');
    
    setMessages([{
      id: '1',
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date().toLocaleTimeString('pl-PL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }]);
  }, []);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date().toLocaleTimeString('pl-PL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const showTypingIndicator = () => {
    setShowTyping(true);
    // Nie ustawiamy automatycznego timeoutu - wskaźnik będzie ukryty ręcznie
    return null;
  };

  const hideTypingIndicator = () => {
    setShowTyping(false);
  };

  const handleSend = async (message: string, formData?: ContactFormData) => {
    // Sprawdź czy jest aktywne wyzwanie CAPTCHA
    if (captchaChallenge?.isActive) {
      // Sprawdź czy wiadomość to odpowiedź na wyzwanie
      if (checkCaptchaAnswer(message)) {
        addMessage('assistant', t('chat.errors.captchaSuccess'));
        // Wyślij oryginalną wiadomość użytkownika (jeśli była)
        if (formData) {
          await sendMessageToN8n(message, formData);
        }
        return;
      } else {
        addMessage('assistant', t('chat.errors.captchaIncorrect'));
        return;
      }
    }

    // Walidacja CAPTCHA - jeśli nie przejdzie, wygeneruj wyzwanie
    if (!validateCaptcha()) {
      const challenge = generateCaptchaChallenge();
      addMessage('assistant', `${t('chat.captcha.challenge')} ${challenge.question}`);
      return;
    }

    // Add user message optimistically
    addMessage('user', message);
    
    // Track form submission
    if (formData?.email) {
      trackForm('contact_chat', {
        has_email: true,
        has_name: !!formData.name,
        has_company: !!formData.company,
        message_length: message.length,
        pre_filled_action: preFilledContent?.action,
      });
    } else {
      track('chat_message_sent', {
        message_length: message.length,
        pre_filled_action: preFilledContent?.action,
      });
    }
    
    // Jeśli jest email w formData, wyślij do webhooka Make.com
    if (formData?.email) {
      try {
        await fetch('https://hook.eu2.make.com/qyj3xxarva1dpvw11zf7x84u6m5t381g', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            source: 'zautomatyzuj',
            wiadomosc: 'formularz kontaktowy'
          })
        });
      } catch (error) {
        console.error('Error sending email to webhook:', error);
      }
    }
    
    // Wyślij wiadomość do n8n
    await sendMessageToN8n(message, formData);
  };

  // Funkcja do wysyłania wiadomości do n8n
  const sendMessageToN8n = async (message: string, formData?: ContactFormData) => {
    setIsLoading(true);
    showTypingIndicator();

    try {
      // Przygotuj payload dla n8n w oczekiwanym formacie (bez metadanych CAPTCHA)
      const payload = {
        action: "sendMessage",
        sessionId: userToken,
        chatInput: message
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Oznacz użytkownika jako powracającego po pierwszej wiadomości
      if (isNewUserFlag) {
        markUserAsReturning();
        setIsNewUserFlag(false);
      }
      
      // Wyświetl odpowiedź od n8n (n8n zwraca {output: "wiadomość"})
      addMessage('assistant', data.output || 'Dziękuję za wiadomość! Wrócimy z odpowiedzią niezwłocznie.');
      
      // Track successful message delivery
      track('chat_message_delivered', {
        has_form_data: !!formData,
        is_new_user: isNewUserFlag,
      });
      
    } catch (error) {
      console.error('Error sending message to n8n:', error);
      
      let errorMessage = t('chat.errors.networkError');
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = t('chat.errors.timeoutError');
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = t('chat.errors.connectionError');
        }
      }
      
      addMessage('assistant', errorMessage);
      
      // Track error
      track('chat_message_error', {
        error_type: error instanceof Error ? error.name : 'unknown',
        error_message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
      hideTypingIndicator();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as any
      }
    }
  } as any;

  return (
    <div className="space-y-8">
      {!ready && (
        <div className="text-center text-slate-400">
          Loading...
        </div>
      )}
      {ready && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
        {/* Header */}
        {showHeader && (
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 
              id="contact-title"
              className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl"
            >
              {t('chat.title')}
            </h2>
            <p className="text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto">
              {t('chat.subtitle')}
            </p>
          </motion.div>
        )}

        {/* Chat Container */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl backdrop-blur-md border border-white/10 bg-white/5 p-6 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          {/* Messages */}
          <div className="space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  role={message.role}
                  timestamp={message.timestamp}
                >
                  {message.content}
                </ChatBubble>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-3xl rounded-bl-lg px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5" />

          {/* Input */}
          <ChatInput 
            onSend={handleSend}
            isLoading={isLoading}
            placeholder="Napisz wiadomość..."
            initialMessage={getPreFilledMessage()}
          />
        </motion.div>

        {/* Additional Info */}
        {showHeader && (
          <motion.div 
            variants={itemVariants}
            className="text-center text-sm text-slate-400 space-y-2"
          >
            <p>
              {t('chat.alternativeContact.text')} 
              <a 
                href="mailto:contact@zautomatyzuj.ai" 
                className="text-brand-primary hover:text-brand-secondary transition-colors ml-1"
                onClick={() => track('link_clicked', { link_url: 'mailto:contact@zautomatyzuj.ai', link_text: t('chat.alternativeContact.email') })}
              >
                {t('chat.alternativeContact.email')}
              </a>
            </p>
            <p className="text-xs">
              {t('chat.alternativeContact.responseTime')}
            </p>
          </motion.div>
        )}
      </motion.div>
      )}
    </div>
  );
};

export default ContactChat;
