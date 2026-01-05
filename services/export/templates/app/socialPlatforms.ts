/**
 * Generate social platforms configuration for the exported App.tsx
 */

export const generateSocialPlatformsConfig = (): string => `
// Social platforms config
const SOCIAL_PLATFORMS: Record<string, { icon: IconType | LucideIcon; brandColor: string; buildUrl: (h: string) => string }> = {
  x: { icon: SiX, brandColor: '#000000', buildUrl: (h) => \`https://x.com/\${h}\` },
  instagram: { icon: SiInstagram, brandColor: '#E4405F', buildUrl: (h) => \`https://instagram.com/\${h}\` },
  tiktok: { icon: SiTiktok, brandColor: '#000000', buildUrl: (h) => \`https://tiktok.com/@\${h}\` },
  youtube: { icon: SiYoutube, brandColor: '#FF0000', buildUrl: (h) => \`https://youtube.com/@\${h}\` },
  github: { icon: SiGithub, brandColor: '#181717', buildUrl: (h) => \`https://github.com/\${h}\` },
  gitlab: { icon: SiGitlab, brandColor: '#FC6D26', buildUrl: (h) => \`https://gitlab.com/\${h}\` },
  linkedin: { icon: SiLinkedin, brandColor: '#0A66C2', buildUrl: (h) => \`https://linkedin.com/in/\${h}\` },
  facebook: { icon: SiFacebook, brandColor: '#1877F2', buildUrl: (h) => \`https://facebook.com/\${h}\` },
  twitch: { icon: SiTwitch, brandColor: '#9146FF', buildUrl: (h) => \`https://twitch.tv/\${h}\` },
  dribbble: { icon: SiDribbble, brandColor: '#EA4C89', buildUrl: (h) => \`https://dribbble.com/\${h}\` },
  medium: { icon: SiMedium, brandColor: '#000000', buildUrl: (h) => \`https://medium.com/@\${h}\` },
  devto: { icon: SiDevdotto, brandColor: '#0A0A0A', buildUrl: (h) => \`https://dev.to/\${h}\` },
  reddit: { icon: SiReddit, brandColor: '#FF4500', buildUrl: (h) => \`https://reddit.com/user/\${h}\` },
  pinterest: { icon: SiPinterest, brandColor: '#BD081C', buildUrl: (h) => \`https://pinterest.com/\${h}\` },
  threads: { icon: SiThreads, brandColor: '#000000', buildUrl: (h) => \`https://threads.net/@\${h}\` },
  bluesky: { icon: SiBluesky, brandColor: '#0085FF', buildUrl: (h) => \`https://bsky.app/profile/\${h}\` },
  mastodon: { icon: SiMastodon, brandColor: '#6364FF', buildUrl: (h) => h },
  substack: { icon: SiSubstack, brandColor: '#FF6719', buildUrl: (h) => \`https://\${h}.substack.com\` },
  patreon: { icon: SiPatreon, brandColor: '#FF424D', buildUrl: (h) => \`https://patreon.com/\${h}\` },
  kofi: { icon: SiKofi, brandColor: '#FF5E5B', buildUrl: (h) => \`https://ko-fi.com/\${h}\` },
  buymeacoffee: { icon: SiBuymeacoffee, brandColor: '#FFDD00', buildUrl: (h) => \`https://buymeacoffee.com/\${h}\` },
  snapchat: { icon: SiSnapchat, brandColor: '#FFFC00', buildUrl: (h) => \`https://snapchat.com/add/\${h}\` },
  discord: { icon: SiDiscord, brandColor: '#5865F2', buildUrl: (h) => h },
  telegram: { icon: SiTelegram, brandColor: '#26A5E4', buildUrl: (h) => \`https://t.me/\${h}\` },
  whatsapp: { icon: SiWhatsapp, brandColor: '#25D366', buildUrl: (h) => \`https://wa.me/\${h}\` },
  website: { icon: Globe, brandColor: '#6B7280', buildUrl: (h) => h.startsWith('http') ? h : \`https://\${h}\` },
  custom: { icon: LinkIcon, brandColor: '#6B7280', buildUrl: (h) => h },
}

// Format follower count: 220430 → "220k", 1500000 → "1.5M"
const formatFollowerCount = (count: number | undefined): string => {
  if (count === undefined || count === null) return ''
  if (count < 1000) return String(count)
  if (count < 1000000) {
    const k = count / 1000
    return k >= 100 ? \`\${Math.round(k)}k\` : \`\${k.toFixed(k % 1 === 0 ? 0 : 1)}k\`
  }
  const m = count / 1000000
  return m >= 100 ? \`\${Math.round(m)}M\` : \`\${m.toFixed(m % 1 === 0 ? 0 : 1)}M\`
}
`;
