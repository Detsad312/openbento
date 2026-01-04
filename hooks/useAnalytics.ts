import { useEffect, useRef, useCallback } from 'react';

export interface AnalyticsConfig {
  enabled?: boolean;
  supabaseUrl?: string;
  anonKey?: string; // DEPRECATED: No longer needed - Edge Function handles auth
  siteId: string;
}

interface TrackEventPayload {
  site_id: string;
  event_type: string;
  visitor_id: string;
  session_id: string;
  page_url: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  user_agent: string;
  language: string;
  screen_w: number | null;
  screen_h: number | null;
  viewport_w: number | null;
  viewport_h: number | null;
  timezone: string | null;
  block_id?: string | null;
  destination_url?: string | null;
  block_title?: string | null;
  duration_seconds?: number;
  scroll_depth?: number;
  engaged?: boolean;
}

// Generate unique visitor ID (persisted in localStorage)
const _getVisitorId = (): string => {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('_ob_vid');
  if (!id) {
    id = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem('_ob_vid', id);
  }
  return id;
};

export const useAnalytics = (config: AnalyticsConfig | undefined) => {
  const sessionStartRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const _sessionIdRef = useRef<string>(sessionStartRef.current.toString(36));

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      maxScrollRef.current = Math.max(maxScrollRef.current, scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track event to Supabase via Edge Function (more secure - no keys exposed)
  const trackEvent = useCallback(
    async (eventType: string, extra: Partial<TrackEventPayload> = {}) => {
      if (!config?.enabled || !config?.supabaseUrl) return;

      try {
        const utm = new URLSearchParams(window.location.search);

        // Payload format for the Edge Function
        const payload = {
          siteId: config.siteId,
          event: eventType === 'page_view' || eventType === 'click' ? eventType : 'page_view',
          blockId: extra.block_id || undefined,
          destinationUrl: extra.destination_url || undefined,
          pageUrl: window.location.href,
          referrer: document.referrer || undefined,
          utm: {
            source: utm.get('utm_source') || undefined,
            medium: utm.get('utm_medium') || undefined,
            campaign: utm.get('utm_campaign') || undefined,
            term: utm.get('utm_term') || undefined,
            content: utm.get('utm_content') || undefined,
          },
          language: navigator.language,
          screenW: window.screen?.width || undefined,
          screenH: window.screen?.height || undefined,
        };

        // Use Edge Function endpoint (no API key needed - function handles auth)
        const endpoint = `${config.supabaseUrl.replace(/\/+$/, '')}/functions/v1/openbento-analytics-track`;

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Silently fail
      }
    },
    [config]
  );

  // Track page view on mount
  useEffect(() => {
    if (!config?.enabled) return;
    trackEvent('page_view');
  }, [config?.enabled, trackEvent]);

  // Track session end on unmount/visibility change
  useEffect(() => {
    if (!config?.enabled) return;

    const trackSessionEnd = () => {
      const duration = Math.round((Date.now() - sessionStartRef.current) / 1000);
      trackEvent('session_end', {
        duration_seconds: duration,
        scroll_depth: maxScrollRef.current,
        engaged: duration > 10 && maxScrollRef.current > 25,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackSessionEnd();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', trackSessionEnd);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', trackSessionEnd);
    };
  }, [config?.enabled, trackEvent]);

  // Track click on a block
  const trackClick = useCallback(
    (blockId: string, destinationUrl?: string, blockTitle?: string) => {
      trackEvent('click', {
        block_id: blockId,
        destination_url: destinationUrl || null,
        block_title: blockTitle || null,
      });
    },
    [trackEvent]
  );

  return { trackClick, trackEvent };
};

export default useAnalytics;
