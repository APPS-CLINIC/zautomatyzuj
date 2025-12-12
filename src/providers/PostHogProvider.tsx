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

    // Support both Astro (PUBLIC_) and Next.js (NEXT_PUBLIC_) prefixes
    const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = import.meta.env.PUBLIC_POSTHOG_HOST || import.meta.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (!posthogKey) {
      if (import.meta.env.DEV) {
        console.warn('[PostHog] PostHog key is not set. PostHog will not track events.');
        console.warn('[PostHog] Set PUBLIC_POSTHOG_KEY (Astro) or NEXT_PUBLIC_POSTHOG_KEY (Next.js) in your .env file to enable tracking.');
        console.warn('[PostHog] Available env vars:', {
          PUBLIC_POSTHOG_KEY: import.meta.env.PUBLIC_POSTHOG_KEY ? 'Set' : 'Not Set',
          NEXT_PUBLIC_POSTHOG_KEY: import.meta.env.NEXT_PUBLIC_POSTHOG_KEY ? 'Set' : 'Not Set',
        });
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
            console.log('[PostHog] Has opted out:', ph.has_opted_out_capturing?.());
            console.log('[PostHog] Config:', ph.config);
            
            // Listen for events being sent
            ph.on('eventCaptured', (event) => {
              console.log('[PostHog] Event captured:', event);
            });
            
            // Listen for events being sent to server
            ph.on('eventSent', (event) => {
              console.log('[PostHog] Event sent to server:', event);
            });
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
        // Disable opt-out by default (user can still opt-out manually)
        opt_out_capturing_by_default: false,
        // Enable batch requests for better performance
        batch_size: 10,
        // Request timeout
        request_batching: true,
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
  const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!posthogKey) {
    return <>{children}</>;
  }

  // Wait for PostHog to initialize before rendering PHProvider
  // PHProvider needs posthog to be initialized
  if (!isInitialized) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}


