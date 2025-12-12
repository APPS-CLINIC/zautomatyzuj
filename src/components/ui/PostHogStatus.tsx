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
    if (posthog) {
      posthog.capture('posthog_test_event', {
        timestamp: new Date().toISOString(),
        test: true,
      });
      setTestEventSent(true);
      setTimeout(() => setTestEventSent(false), 3000);
    } else if ((window as any).posthog) {
      (window as any).posthog.capture('posthog_test_event', {
        timestamp: new Date().toISOString(),
        test: true,
      });
      setTestEventSent(true);
      setTimeout(() => setTestEventSent(false), 3000);
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
          <button
            onClick={sendTestEvent}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
          >
            {testEventSent ? '✓ Test Event Sent' : 'Send Test Event'}
          </button>
        )}
        <div className="text-xs text-slate-400 mt-2">
          Key: {import.meta.env.PUBLIC_POSTHOG_KEY ? '✓ Set' : '✗ Not Set'}
        </div>
      </div>
    </div>
  );
}

