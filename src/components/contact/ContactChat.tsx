import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

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
}

const ContactChat: React.FC<ContactChatProps> = ({ showHeader = true }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Cześć! W czym mogę pomóc? Wybierz temat lub opisz krótko swoje potrzeby.',
      timestamp: new Date().toLocaleTimeString('pl-PL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

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
    setTimeout(() => setShowTyping(false), 2000);
  };

  const handleSend = async (message: string, formData?: ContactFormData) => {
    // Add user message optimistically
    addMessage('user', message);
    
    setIsLoading(true);
    showTypingIndicator();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas wysyłania wiadomości');
      }

      // Simulate response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add assistant confirmation
      const email = formData?.email || 'Twój email';
      addMessage('assistant', `Dzięki! Wysłaliśmy potwierdzenie na ${email}. Wrócimy z odpowiedzią niezwłocznie.`);
      
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('assistant', 'Przepraszam, wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.');
    } finally {
      setIsLoading(false);
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
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-8">
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
              Szybki kontakt
            </h2>
            <p className="text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto">
              Zadaj pytanie w czacie poniżej lub wyślij krótką wiadomość — odpowiemy bardzo szybko.
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
          />
        </motion.div>

        {/* Additional Info */}
        {showHeader && (
          <motion.div 
            variants={itemVariants}
            className="text-center text-sm text-slate-400 space-y-2"
          >
            <p>
              Lub skontaktuj się z nami bezpośrednio: 
              <a 
                href="mailto:kontakt@zautomatyzuj.ai" 
                className="text-brand-primary hover:text-brand-secondary transition-colors ml-1"
              >
                kontakt@zautomatyzuj.ai
              </a>
            </p>
            <p className="text-xs">
              Odpowiadamy w ciągu 24 godzin w dni robocze
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ContactChat;
