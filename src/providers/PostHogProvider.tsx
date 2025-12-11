'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const initPostHog = async () => {
        try {
          const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY;
          const posthogHost = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

          if (posthogKey) {
            posthog.init(posthogKey, {
              api_host: posthogHost,
              loaded: (ph) => {
                if (import.meta.env.DEV) {
                  ph.debug();
                  console.log('[PostHog] Initialized successfully');
                }
                // Make posthog available globally for utility functions
                if (typeof window !== 'undefined') {
                  (window as any).posthog = ph;
                }
                setClient(ph);
              },
              // Enhanced tracking options for landing page
              capture_pageview: true,
              capture_pageleave: true,
              autocapture: true,
              // Session recording (if enabled in PostHog)
              session_recording: {
                maskAllInputs: false,
                maskInputOptions: {
                  password: true,
                  email: true,
                },
              },
            });
          } else {
            // In development mode, initialize PostHog with a dummy key to enable tracking functions
            // Events won't be sent without a valid key, but the API will be available
            if (import.meta.env.DEV) {
              console.log('[PostHog] Running in development mode without API key. Tracking functions available but events will not be sent.');
            }
            // Create a mock posthog instance for development
            const mockPosthog = {
              capture: (event: string, props?: any) => {
                if (import.meta.env.DEV) {
                  console.log('[PostHog] Event:', event, props);
                }
              },
              identify: (userId: string, props?: any) => {
                if (import.meta.env.DEV) {
                  console.log('[PostHog] Identify:', userId, props);
                }
              },
              reset: () => {
                if (import.meta.env.DEV) {
                  console.log('[PostHog] Reset');
                }
              },
            };
            if (typeof window !== 'undefined') {
              (window as any).posthog = mockPosthog;
            }
            setClient(mockPosthog as any);
          }
        } catch (error) {
          console.warn('Failed to initialize PostHog:', error);
          // Still render children even if PostHog fails
          setClient({});
        }
      };

      initPostHog();
    }
  }, []);

  if (!mounted || !client) {
    return <>{children}</>;
  }

  return <PHProvider client={client}>{children}</PHProvider>;
}


