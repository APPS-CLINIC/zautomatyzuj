'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// Initialize PostHog outside of component to ensure it's ready before first render
let posthogInitialized = false;

if (typeof window !== 'undefined') {
  const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = import.meta.env.PUBLIC_POSTHOG_HOST || import.meta.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (posthogKey && !posthogInitialized && !(posthog as any).__loaded) {
    try {
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
            console.log('[PostHog] __loaded:', (ph as any).__loaded);
            
            // Test capture immediately
            ph.capture('posthog_initialized', {
              timestamp: new Date().toISOString(),
              source: 'PostHogProvider',
            });
            console.log('[PostHog] Test event "posthog_initialized" sent');
            
            // Force flush to send immediately
            if (ph.flush) {
              ph.flush();
              console.log('[PostHog] Flushed events');
            }
          }
          // Make posthog available globally for utility functions
          (window as any).posthog = ph;
          posthogInitialized = true;
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
        // In development, send events immediately (no batching delay)
        // In production, batch events for better performance
        batch_size: import.meta.env.DEV ? 1 : 10,
        request_batching: !import.meta.env.DEV, // Disable batching in dev for immediate feedback
        // Send events immediately in dev mode
        _capture_metrics: true,
        // Disable compression in dev for easier debugging
        _compress: !import.meta.env.DEV,
      });
    } catch (error) {
      console.error('[PostHog] Failed to initialize:', error);
    }
  } else if (!posthogKey && import.meta.env.DEV) {
    console.warn('[PostHog] PostHog key is not set. PostHog will not track events.');
    console.warn('[PostHog] Set PUBLIC_POSTHOG_KEY (Astro) or NEXT_PUBLIC_POSTHOG_KEY (Next.js) in your .env file to enable tracking.');
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Support both Astro (PUBLIC_) and Next.js (NEXT_PUBLIC_) prefixes
  const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;

  // Wait for mount
  if (!mounted) {
    return <>{children}</>;
  }

  // If no key is set, just render children without PostHog provider
  if (!posthogKey) {
    return <>{children}</>;
  }

  // PostHog should be initialized by now (synchronously above)
  // But check if it's actually loaded
  const isPostHogReady = typeof window !== 'undefined' && 
    ((posthog as any).__loaded || (window as any).posthog);

  if (!isPostHogReady) {
    // PostHog is still initializing, wait a bit
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}


