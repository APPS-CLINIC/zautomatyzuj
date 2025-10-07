import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * CommandPalette.tsx - React island dla Command Palette (Cmd/Ctrl + K)
 * 
 * Funkcje:
 * - Globalny dostęp z klawiatury (Cmd/Ctrl + K)
 * - 4 akcje kontaktowe z formularzami
 * - Validacja z React Hook Form + Zod
 * - Toast notyfikacje
 * - Wzorzec Command Pattern
 */

interface CommandAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  form: {
    fields: Array<{
      name: string;
      label: string;
      type: 'email' | 'text' | 'textarea' | 'select';
      required: boolean;
      options?: string[];
    }>;
  };
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [selectedAction, setSelectedAction] = useState<CommandAction | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Akcje Command Palette
  const actions: CommandAction[] = [
    {
      id: 'audit',
      title: t('commandPalette.actions.audit.title'),
      description: t('commandPalette.actions.audit.description'),
      icon: '🔍',
      form: {
        fields: [
          { name: 'email', label: t('commandPalette.form.email'), type: 'email', required: true },
          { name: 'subject', label: t('commandPalette.form.subject'), type: 'text', required: true },
          { name: 'preferredDate', label: t('commandPalette.form.preferredDate'), type: 'text', required: false },
          { name: 'message', label: t('commandPalette.form.message'), type: 'textarea', required: false }
        ]
      }
    },
    {
      id: 'quote',
      title: t('commandPalette.actions.quote.title'),
      description: t('commandPalette.actions.quote.description'),
      icon: '💰',
      form: {
        fields: [
          { name: 'email', label: t('commandPalette.form.email'), type: 'email', required: true },
          { name: 'projectDescription', label: t('commandPalette.form.projectDescription'), type: 'textarea', required: true },
          { name: 'budget', label: t('commandPalette.form.budget'), type: 'select', required: false, options: ['< 10k', '10k - 50k', '50k - 100k', '> 100k'] },
          { name: 'timeline', label: t('commandPalette.form.timeline'), type: 'text', required: false }
        ]
      }
    },
    {
      id: 'demo',
      title: t('commandPalette.actions.demo.title'),
      description: t('commandPalette.actions.demo.description'),
      icon: '🎯',
      form: {
        fields: [
          { name: 'email', label: t('commandPalette.form.email'), type: 'email', required: true },
          { name: 'preferredDate', label: t('commandPalette.form.preferredDate'), type: 'text', required: true },
          { name: 'demoType', label: t('commandPalette.form.demoType'), type: 'select', required: true, options: ['Live demo', 'Screen recording', 'Custom scenario'] },
          { name: 'teamSize', label: t('commandPalette.form.teamSize'), type: 'text', required: false }
        ]
      }
    },
    {
      id: 'contact',
      title: t('commandPalette.actions.contact.title'),
      description: t('commandPalette.actions.contact.description'),
      icon: '💬',
      form: {
        fields: [
          { name: 'email', label: t('commandPalette.form.email'), type: 'email', required: true },
          { name: 'subject', label: t('commandPalette.form.subject'), type: 'text', required: true },
          { name: 'message', label: t('commandPalette.form.message'), type: 'textarea', required: true }
        ]
      }
    }
  ];

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Command Palette będzie otwarty przez parent component
        }
      }
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset formularza przy zamknięciu
  useEffect(() => {
    if (!isOpen) {
      setSelectedAction(null);
      setFormData({});
    }
  }, [isOpen]);

  // Obsługa zmiany formularza
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Wysyłka formularza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: selectedAction?.id,
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // TODO: Implement toast notification
        console.log('Form submitted successfully');
        onClose();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // TODO: Implement error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  // Walidacja formularza
  const isFormValid = () => {
    if (!selectedAction) return false;
    
    return selectedAction.form.fields.every(field => {
      if (!field.required) return true;
      return formData[field.name] && formData[field.name].trim() !== '';
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-slate-900/95 backdrop-blur-md border border-brand-primary/20 rounded-2xl shadow-brand-glow-xl">
        {!selectedAction ? (
          /* Actions List */
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gradient">
                {t('commandPalette.title')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-brand-primary transition-colors rounded-lg hover:bg-brand-primary/10"
                aria-label={t('commandPalette.close')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action)}
                  className="w-full p-4 text-left rounded-xl border border-brand-primary/20 bg-slate-800/50 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-brand-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-brand-primary/20">
              <p className="text-xs text-slate-500 text-center">
                {t('commandPalette.shortcut')}
              </p>
            </div>
          </div>
        ) : (
          /* Form */
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedAction(null)}
                className="p-2 text-slate-400 hover:text-brand-primary transition-colors rounded-lg hover:bg-brand-primary/10"
                aria-label={t('commandPalette.back')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-2xl">{selectedAction.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedAction.title}</h2>
                <p className="text-sm text-slate-400">{selectedAction.description}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedAction.form.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {field.label}
                    {field.required && <span className="text-brand-primary ml-1">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-brand-primary/20 rounded-lg text-white placeholder-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                      placeholder={field.label}
                      rows={4}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-brand-primary/20 rounded-lg text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                      required={field.required}
                    >
                      <option value="">{t('commandPalette.form.selectOption')}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-brand-primary/20 rounded-lg text-white placeholder-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                      placeholder={field.label}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedAction(null)}
                  className="flex-1 px-4 py-3 text-slate-300 border rounded-lg hover:border-brand-primary transition-all duration-300"
                  style={{ borderColor: 'rgb(var(--brand-primary-rgb) / 0.3)', backgroundColor: 'rgb(var(--brand-primary-rgb) / 0.1)' }}
                >
                  {t('commandPalette.form.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="flex-1 px-4 py-3 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-via), var(--brand-gradient-to))' }}
                >
                  {isSubmitting ? t('commandPalette.form.submitting') : t('commandPalette.form.submit')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;
