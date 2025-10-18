import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown, ChevronUp, User, Mail, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatInputProps {
  onSend: (message: string, formData?: ContactFormData) => void;
  isLoading?: boolean;
  placeholder?: string;
}

interface ContactFormData {
  name?: string;
  email: string;
  company?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isLoading = false, 
  placeholder = "Napisz wiadomość..." 
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 5 * 24; // 5 lines * 24px line height
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (isExpanded && !validateForm()) {
      return;
    }
    
    onSend(message.trim(), isExpanded ? formData : undefined);
    setMessage('');
    setFormData({ name: '', email: '', company: '' });
    setErrors({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = message.trim().length > 0 && 
    (!isExpanded || (formData.email && Object.keys(errors).length === 0));

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
      {/* Quick Reply Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          t('chat.quickActions.quote'),
          t('chat.quickActions.audit'), 
          t('chat.quickActions.integration'),
          t('chat.quickActions.training')
        ].map((chip) => (
          <motion.button
            key={chip}
            onClick={() => setMessage(chip)}
            className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all duration-200 hover:border-brand-primary/50 hover:shadow-brand-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {chip}
          </motion.button>
        ))}
      </div>

      {/* Expandable Form */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors"
        whileHover={{ x: 2 }}
      >
        <span>{t('chat.contactDetails.title')}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  <User className="w-3 h-3 inline mr-1" />
                  Imię (opcjonalne)
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-slate-400 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder={t('chat.contactDetails.name')}
                />
              </div>
              
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  <Mail className="w-3 h-3 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                  className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none transition-all ${
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-white/20 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20'
                  }`}
                  placeholder={t('chat.contactDetails.email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">
                  <Building className="w-3 h-3 inline mr-1" />
                  Firma (opcjonalne)
                </label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-slate-400 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder={t('chat.contactDetails.company')}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.input.placeholder')}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 resize-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all min-h-[3rem]"
            rows={1}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              {message && (
                <button
                  onClick={() => setMessage('')}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {t('chat.input.clear')}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={handleSend}
          disabled={!canSend || isLoading}
          className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
            canSend && !isLoading
              ? 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-brand-glow text-white'
              : 'bg-white/10 text-slate-400 cursor-not-allowed'
          }`}
          whileHover={canSend && !isLoading ? { scale: 1.05 } : {}}
          whileTap={canSend && !isLoading ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
