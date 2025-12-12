'use client';

import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';

/**
 * Component to test and display PostHog status
 * Only visible in development mode
 */
export function PostHogStatus() {
  const posthog = usePostHog();
  const [status, setStatus] = useState<'checking' | 'ready' | 'not_available'>('checking');
  const [testEventSent, setTestEventSent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if PostHog is available
    const checkPostHog = () => {
      const windowPosthog = (window as any).posthog;
      
      if (posthog && typeof posthog.capture === 'function') {
        console.log('[PostHogStatus] PostHog ready via hook');
        setStatus('ready');
      } else if (windowPosthog && typeof windowPosthog.capture === 'function') {
        console.log('[PostHogStatus] PostHog ready via window.posthog');
        setStatus('ready');
      } else {
        console.warn('[PostHogStatus] PostHog not available');
        console.warn('[PostHogStatus] posthog from hook:', posthog);
        console.warn('[PostHogStatus] window.posthog:', windowPosthog);
        console.warn('[PostHogStatus] PUBLIC_POSTHOG_KEY:', import.meta.env.PUBLIC_POSTHOG_KEY ? 'Set' : 'Not Set');
        console.warn('[PostHogStatus] NEXT_PUBLIC_POSTHOG_KEY:', import.meta.env.NEXT_PUBLIC_POSTHOG_KEY ? 'Set' : 'Not Set');
        setStatus('not_available');
      }
    };

    // Wait a bit for PostHog to initialize
    const timer = setTimeout(checkPostHog, 1000);
    // Also check after 3 seconds in case it takes longer
    const timer2 = setTimeout(checkPostHog, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [posthog]);

  const sendTestEvent = () => {
    const ph = posthog || (window as any).posthog;
    if (ph && typeof ph.capture === 'function') {
      try {
        console.log('[PostHogStatus] Sending test event...');
        console.log('[PostHogStatus] PostHog instance:', ph);
        console.log('[PostHogStatus] Has opt_out_capturing:', ph.has_opted_out_capturing?.());
        console.log('[PostHogStatus] API Host:', ph.config?.api_host);
        console.log('[PostHogStatus] Token:', ph.config?.token?.substring(0, 10) + '...');
        
        ph.capture('posthog_test_event', {
          timestamp: new Date().toISOString(),
          test: true,
          source: 'PostHogStatus',
        });
        
        console.log('[PostHogStatus] Test event sent');
        setTestEventSent(true);
        setTimeout(() => setTestEventSent(false), 3000);
      } catch (error) {
        console.error('[PostHogStatus] Error sending test event:', error);
      }
    } else {
      console.error('[PostHogStatus] PostHog not available');
    }
  };

  // Only show in development
  if (typeof window === 'undefined' || import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg text-sm">
      <div className="space-y-2">
        <div className="font-semibold text-white mb-2">PostHog Status</div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              status === 'ready'
                ? 'bg-green-500'
                : status === 'not_available'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          />
          <span className="text-slate-300">
            {status === 'ready'
              ? 'PostHog Ready'
              : status === 'not_available'
              ? 'PostHog Not Available'
              : 'Checking...'}
          </span>
        </div>
        {status === 'ready' && (
          <div className="mt-2 space-y-1">
            <button
              onClick={sendTestEvent}
              className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
            >
              {testEventSent ? '✓ Test Event Sent' : 'Send Test Event'}
            </button>
            <button
              onClick={() => {
                const ph = posthog || (window as any).posthog;
                if (ph && typeof ph.flush === 'function') {
                  console.log('[PostHogStatus] Flushing events...');
                  ph.flush();
                  console.log('[PostHogStatus] Events flushed');
                }
              }}
              className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
            >
              Flush Events (send now)
            </button>
            <button
              onClick={() => {
                const ph = posthog || (window as any).posthog;
                if (ph) {
                  const optedOut = ph.has_opted_out_capturing?.();
                  if (optedOut) {
                    ph.opt_in_capturing();
                    console.log('[PostHogStatus] Opted in');
                  } else {
                    ph.opt_out_capturing();
                    console.log('[PostHogStatus] Opted out');
                  }
                  // Re-check status
                  setTimeout(() => {
                    const checkPostHog = () => {
                      const ph = posthog || (window as any).posthog;
                      if (ph && typeof ph.capture === 'function') {
                        setStatus('ready');
                      } else {
                        setStatus('not_available');
                      }
                    };
                    checkPostHog();
                  }, 100);
                }
              }}
              className="w-full px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs transition-colors"
            >
              Toggle Opt-out
            </button>
          </div>
        )}
        <div className="text-xs text-slate-400 mt-2 space-y-1">
          <div>Key: {(import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY) ? '✓ Set' : '✗ Not Set'}</div>
          {status === 'ready' && (() => {
            const ph = posthog || (window as any).posthog;
            const hasOptedOut = ph?.has_opted_out_capturing?.();
            const apiHost = ph?.config?.api_host;
            return (
              <>
                <div>Opt-out: {hasOptedOut ? '✗ Yes (events disabled)' : '✓ No'}</div>
                <div>API Host: {apiHost || 'Unknown'}</div>
                <div className="text-yellow-400 mt-2">
                  {hasOptedOut && '⚠️ User has opted out - events will not be sent'}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

