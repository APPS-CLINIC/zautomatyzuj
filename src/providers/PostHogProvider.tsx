'use client';

import { useEffect, useRef, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

let posthogInitialized = false;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<typeof posthog | null>(null);
  const [ready, setReady] = useState(false);
  const initAttempted = useRef(false);

  useEffect(() => {
    if (initAttempted.current) {
      if (posthogInitialized) {
        setClient(posthog);
        setReady(true);
      }
      return;
    }

    initAttempted.current = true;

    if (typeof window === 'undefined') {
      return;
    }

    const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = import.meta.env.PUBLIC_POSTHOG_HOST || import.meta.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (!posthogKey) {
      if (import.meta.env.DEV) {
        console.warn('[PostHog] PostHog key is not set. PostHog will not track events.');
        console.warn('[PostHog] Set PUBLIC_POSTHOG_KEY (Astro) or NEXT_PUBLIC_POSTHOG_KEY (Next.js) in your .env file to enable tracking.');
      }
      return;
    }

    try {
      if (posthogInitialized || (posthog as any).__loaded) {
        (window as any).posthog = posthog;
        setClient(posthog);
        setReady(true);
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
            console.log('[PostHog] __loaded:', (ph as any).__loaded);

            ph.capture('posthog_initialized', {
              timestamp: new Date().toISOString(),
              source: 'PostHogProvider',
            });
            console.log('[PostHog] Test event "posthog_initialized" sent');

            if (ph.flush) {
              ph.flush();
              console.log('[PostHog] Flushed events');
            }
          }

          (window as any).posthog = ph;
          posthogInitialized = true;
          setClient(ph);
          setReady(true);
        },
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        session_recording: {
          maskAllInputs: false,
          maskInputOptions: {
            password: true,
            email: true,
          },
        },
        debug: import.meta.env.DEV,
        persistence: 'localStorage+cookie',
        opt_out_capturing_by_default: false,
        batch_size: import.meta.env.DEV ? 1 : 10,
        request_batching: !import.meta.env.DEV,
        _capture_metrics: true,
        _compress: !import.meta.env.DEV,
      });
    } catch (error) {
      console.error('[PostHog] Failed to initialize:', error);
    }
  }, []);

  if (!ready || !client) {
    return <>{children}</>;
  }

  return <PHProvider client={client}>{children}</PHProvider>;
}
