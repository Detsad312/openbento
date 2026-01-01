/**
 * Generate React hooks for the exported App.tsx
 */

export const generateTiltHook = (): string => `
// Tilt effect hook
const useTiltEffect = (isEnabled = true) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled || !elementRef.current) return
    const rect = elementRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    const shadowX = rotateY * 1.5
    const shadowY = rotateX * -1.5
    setTiltStyle({
      transform: \`perspective(800px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`,
      boxShadow: \`\${shadowX}px \${shadowY}px 25px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.1)\`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
      '--glare-x': \`\${glareX}%\`,
      '--glare-y': \`\${glareY}%\`,
    } as React.CSSProperties)
  }, [isEnabled])

  const handleMouseLeave = useCallback(() => {
    if (!isEnabled) return
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    })
  }, [isEnabled])

  return { elementRef, tiltStyle, handleMouseMove, handleMouseLeave }
}
`;

export const generateAnalyticsHook = (siteId: string): string => `
// Analytics hook (uses Edge Function - no API keys exposed)
const useAnalytics = () => {
  const sessionStart = useRef(Date.now())
  const maxScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      maxScroll.current = Math.max(maxScroll.current, scrollPercent)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const config = profile.analytics
    if (!config?.enabled || !config?.supabaseUrl) return

    const track = async (eventType: 'page_view' | 'click', extra: { blockId?: string; destinationUrl?: string } = {}) => {
      const utm = new URLSearchParams(window.location.search)
      const payload = {
        siteId: '${siteId}',
        event: eventType,
        blockId: extra.blockId,
        destinationUrl: extra.destinationUrl,
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
        screenW: window.screen?.width,
        screenH: window.screen?.height,
      }
      // Use Edge Function endpoint (secure - no API keys needed)
      const endpoint = config.supabaseUrl.replace(/\\/+$/, '') + '/functions/v1/openbento-analytics-track'
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }

    track('page_view')

    // Note: session_end is not supported by the Edge Function, only page_view and click
    // If you need session tracking, extend the Edge Function
  }, [])
}
`;
