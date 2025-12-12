'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === 'undefined') {
      return;
    }

    const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY;
    const posthogHost = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (!posthogKey) {
      if (import.meta.env.DEV) {
        console.warn('[PostHog] PUBLIC_POSTHOG_KEY is not set. PostHog will not track events.');
        console.warn('[PostHog] Set PUBLIC_POSTHOG_KEY in your .env file to enable tracking.');
      }
      setIsInitialized(true);
      return;
    }

    try {
      // Check if PostHog is already initialized
      if ((posthog as any).__loaded) {
        if (import.meta.env.DEV) {
          console.log('[PostHog] Already initialized');
        }
        setIsInitialized(true);
        return;
      }

      posthog.init(posthogKey, {
        api_host: posthogHost,
        loaded: (ph) => {
          if (import.meta.env.DEV) {
            ph.debug();
            console.log('[PostHog] Initialized successfully');
            console.log('[PostHog] API Host:', posthogHost);
            console.log('[PostHog] Key:', posthogKey.substring(0, 10) + '...');
          }
          // Make posthog available globally for utility functions
          if (typeof window !== 'undefined') {
            (window as any).posthog = ph;
          }
          setIsInitialized(true);
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
        // Enable debug mode in development
        debug: import.meta.env.DEV,
        // Persist user across sessions
        persistence: 'localStorage+cookie',
      });
    } catch (error) {
      console.error('[PostHog] Failed to initialize:', error);
      setIsInitialized(true); // Still render children even if PostHog fails
    }
  }, []);

  // Wait for mount
  if (!mounted) {
    return <>{children}</>;
  }

  // If no key is set, just render children without PostHog provider
  if (!import.meta.env.PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  // Wait for PostHog to initialize before rendering PHProvider
  // PHProvider needs posthog to be initialized
  if (!isInitialized) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}


