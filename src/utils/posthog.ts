'use client';

import { usePostHog } from 'posthog-js/react';

/**
 * Utility functions for PostHog tracking
 */

export interface TrackingProperties {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Track a custom event with PostHog
 */
export function trackEvent(eventName: string, properties?: TrackingProperties) {
  if (typeof window === 'undefined') return;
  
  // Wait for PostHog to be ready (with timeout)
  const waitForPostHog = (maxAttempts = 10, attempt = 0) => {
    try {
      const posthog = (window as { posthog?: { 
        capture: (event: string, props?: TrackingProperties) => void; 
        has_opted_out_capturing?: () => boolean;
        __loaded?: boolean;
        config?: { token?: string };
        flush?: () => void;
      } }).posthog;
      
      if (posthog && typeof posthog.capture === 'function') {
        // Check if PostHog is actually loaded
        if (!posthog.__loaded && !posthog.config?.token) {
          if (import.meta.env.DEV) {
            console.warn('[PostHog] PostHog not fully loaded yet, retrying...', eventName);
          }
          if (attempt < maxAttempts) {
            setTimeout(() => waitForPostHog(maxAttempts, attempt + 1), 100);
          }
          return;
        }
        
        // Check if user has opted out
        if (posthog.has_opted_out_capturing?.()) {
          if (import.meta.env.DEV) {
            console.warn('[PostHog] User has opted out - event not sent:', eventName);
          }
          return;
        }
        
        posthog.capture(eventName, {
          ...properties,
          timestamp: new Date().toISOString(),
        });
        
        if (import.meta.env.DEV) {
          console.log('[PostHog] Event tracked:', eventName, properties);
          // Force flush in dev mode for immediate feedback
          if (posthog.flush) {
            posthog.flush();
          }
        }
      } else {
        if (attempt < maxAttempts) {
          // PostHog not ready yet, retry
          setTimeout(() => waitForPostHog(maxAttempts, attempt + 1), 100);
        } else {
          if (import.meta.env.DEV) {
            console.warn('[PostHog] PostHog not available after', maxAttempts, 'attempts. Event not tracked:', eventName);
          }
        }
      }
    } catch (error) {
      console.warn('[PostHog] Failed to track event:', eventName, error);
    }
  };
  
  waitForPostHog();
}

const getWindowPostHog = () => {
  if (typeof window === 'undefined') return undefined;
  return (window as any).posthog as
    | (ReturnType<typeof usePostHog> & {
        __loaded?: boolean;
        config?: { token?: string };
        has_opted_out_capturing?: () => boolean;
        flush?: () => void;
      })
    | undefined;
};

/**
 * Identify user in PostHog
 */
export function identifyUser(userId: string, email?: string, properties?: TrackingProperties) {
  if (typeof window === 'undefined') return;
  
  try {
    const posthog = (window as { posthog?: { identify: (userId: string, props?: TrackingProperties) => void } }).posthog;
    if (posthog) {
      posthog.identify(userId, {
        email,
        ...properties,
      });
    }
  } catch (error) {
    console.warn('Failed to identify user:', error);
  }
}

/**
 * Reset user identification (on logout)
 */
export function resetUser() {
  if (typeof window === 'undefined') return;
  
  try {
    const posthog = (window as { posthog?: { reset: () => void } }).posthog;
    if (posthog) {
      posthog.reset();
    }
  } catch (error) {
    console.warn('Failed to reset user:', error);
  }
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, properties?: TrackingProperties) {
  trackEvent('button_clicked', {
    button_name: buttonName,
    ...properties,
  });
}

/**
 * Track link clicks
 */
export function trackLinkClick(linkUrl: string, linkText?: string, properties?: TrackingProperties) {
  trackEvent('link_clicked', {
    link_url: linkUrl,
    link_text: linkText,
    ...properties,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, properties?: TrackingProperties) {
  trackEvent('form_submitted', {
    form_name: formName,
    ...properties,
  });
}

/**
 * Track section views (for scroll tracking)
 */
export function trackSectionView(sectionName: string, properties?: TrackingProperties) {
  trackEvent('section_viewed', {
    section_name: sectionName,
    ...properties,
  });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, ctaLocation: string, properties?: TrackingProperties) {
  trackEvent('cta_clicked', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    ...properties,
  });
}

/**
 * Track language changes
 */
export function trackLanguageChange(language: string) {
  trackEvent('language_changed', {
    language,
  });
}

/**
 * Track page views
 */
export function trackPageView(pagePath: string, pageName?: string) {
  trackEvent('page_viewed', {
    page_path: pagePath,
    page_name: pageName || pagePath,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
  });
}

/**
 * Hook to use PostHog tracking
 */
export function useTracking() {
  const posthog = usePostHog();

  const getClient = () => {
    const client = posthog || getWindowPostHog();
    if (!client) return undefined;
    if (client.has_opted_out_capturing?.()) return undefined;
    if (!client.__loaded && !client.config?.token) return undefined;
    return client;
  };

  const track = (eventName: string, properties?: TrackingProperties) => {
    const client = getClient();
    if (!client) return;
    client.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
    if (import.meta.env.DEV && client.flush) {
      client.flush();
    }
  };

  const identify = (userId: string, email?: string, properties?: TrackingProperties) => {
    const client = getClient();
    if (!client) return;
    client.identify(userId, {
      email,
      ...properties,
    });
  };

  const reset = () => {
    const client = getClient();
    if (!client) return;
    client.reset();
  };

  const trackButton = (buttonName: string, properties?: TrackingProperties) => {
    track('button_clicked', {
      button_name: buttonName,
      ...properties,
    });
  };

  const trackLink = (linkUrl: string, linkText?: string, properties?: TrackingProperties) => {
    track('link_clicked', {
      link_url: linkUrl,
      link_text: linkText,
      ...properties,
    });
  };

  const trackForm = (formName: string, properties?: TrackingProperties) => {
    track('form_submitted', {
      form_name: formName,
      ...properties,
    });
  };

  const trackSection = (sectionName: string, properties?: TrackingProperties) => {
    track('section_viewed', {
      section_name: sectionName,
      ...properties,
    });
  };

  const trackCTA = (ctaName: string, ctaLocation: string, properties?: TrackingProperties) => {
    track('cta_clicked', {
      cta_name: ctaName,
      cta_location: ctaLocation,
      ...properties,
    });
  };

  const trackPage = (pagePath: string, pageName?: string) => {
    track('page_viewed', {
      page_path: pagePath,
      page_name: pageName || pagePath,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    });
  };

  return { 
    track, 
    identify, 
    reset, 
    posthog,
    trackButton,
    trackLink,
    trackForm,
    trackSection,
    trackCTA,
    trackPage,
  };
}

