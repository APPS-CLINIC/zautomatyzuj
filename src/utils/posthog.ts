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
  
  try {
    const posthog = (window as { posthog?: { capture: (event: string, props?: TrackingProperties) => void; has_opted_out_capturing?: () => boolean } }).posthog;
    if (posthog) {
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
      }
    } else {
      if (import.meta.env.DEV) {
        console.warn('[PostHog] PostHog not available - event not tracked:', eventName);
      }
    }
  } catch (error) {
    console.warn('[PostHog] Failed to track event:', eventName, error);
  }
}

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

  const track = (eventName: string, properties?: TrackingProperties) => {
    if (posthog) {
      posthog.capture(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const identify = (userId: string, email?: string, properties?: TrackingProperties) => {
    if (posthog) {
      posthog.identify(userId, {
        email,
        ...properties,
      });
    }
  };

  const reset = () => {
    if (posthog) {
      posthog.reset();
    }
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


