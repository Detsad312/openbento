import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Beaker,
} from 'lucide-react';
import { importBentoFromJSON, type BentoJSON } from '../services/storageService';
import type { SavedBento } from '../types';

type AIGeneratorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBentoImported: (bento: SavedBento) => void;
};

type VisualStyle = 'modern' | 'minimalist' | 'colorful' | 'dark' | 'professional' | 'playful';

const VISUAL_STYLES: { value: VisualStyle; label: string; description: string }[] = [
  { value: 'modern', label: 'Modern', description: 'Clean & contemporary' },
  { value: 'minimalist', label: 'Minimalist', description: 'Simple & refined' },
  { value: 'colorful', label: 'Colorful', description: 'Vibrant & dynamic' },
  { value: 'dark', label: 'Dark', description: 'Elegant dark mode' },
  { value: 'professional', label: 'Professional', description: 'Corporate & serious' },
  { value: 'playful', label: 'Playful', description: 'Creative & fun' },
];

const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onBentoImported,
}) => {
  // Step state
  const [step, setStep] = useState<'prompt' | 'import'>('prompt');

  // Form state (Step 1)
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socialUrls, setSocialUrls] = useState<string[]>(['']);
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('modern');
  const [customRequest, setCustomRequest] = useState('');

  // Copy state
  const [copied, setCopied] = useState(false);

  // Import state (Step 2)
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Reset state when modal closes
  const handleClose = () => {
    setStep('prompt');
    setName('');
    setBio('');
    setSocialUrls(['']);
    setVisualStyle('modern');
    setCustomRequest('');
    setJsonInput('');
    setJsonError(null);
    setImportSuccess(false);
    setCopied(false);
    onClose();
  };

  // Add/remove social URLs
  const addSocialUrl = () => {
    setSocialUrls([...socialUrls, '']);
  };

  const removeSocialUrl = (index: number) => {
    setSocialUrls(socialUrls.filter((_, i) => i !== index));
  };

  const updateSocialUrl = (index: number, value: string) => {
    const updated = [...socialUrls];
    updated[index] = value;
    setSocialUrls(updated);
  };

  // Generate the prompt dynamically
  const generatedPrompt = useMemo(() => {
    const userInfo = [];

    if (name.trim()) {
      userInfo.push(`- Name/Username: ${name.trim()}`);
    }
    if (bio.trim()) {
      userInfo.push(`- Bio: ${bio.trim()}`);
    }

    const validUrls = socialUrls.filter((url) => url.trim());
    if (validUrls.length > 0) {
      userInfo.push(`- Social networks:\n${validUrls.map((url) => `  • ${url}`).join('\n')}`);
    }

    userInfo.push(
      `- Desired visual style: ${VISUAL_STYLES.find((s) => s.value === visualStyle)?.label || visualStyle}`
    );

    if (customRequest.trim()) {
      userInfo.push(`- Specific request: ${customRequest.trim()}`);
    }

    return `I want to create a Bento-style "link-in-bio" page with OpenBento.

${userInfo.length > 0 ? `## My information\n${userInfo.join('\n')}\n` : ''}
## Your task

Generate a valid JSON to configure my Bento page. The JSON must follow EXACTLY this format:

\`\`\`json
{
  "name": "Bento Name",
  "profile": {
    "name": "My Name",
    "bio": "My bio in 1-2 lines",
    "avatarUrl": "",
    "theme": "light",
    "primaryColor": "blue",
    "showBranding": true,
    "showSocialInHeader": true,
    "showFollowerCount": true,
    "backgroundColor": "#f5f5f5",
    "socialAccounts": [
      { "platform": "instagram", "handle": "myhandle", "followerCount": 15000 },
      { "platform": "youtube", "handle": "mychannel", "followerCount": 50000 },
      { "platform": "github", "handle": "myusername" }
    ]
  },
  "blocks": [
    {
      "id": "block_1",
      "type": "BLOCK_TYPE",
      "title": "Title",
      "subtext": "Subtitle",
      "content": "URL or text",
      "colSpan": 3,
      "rowSpan": 3,
      "gridColumn": 1,
      "gridRow": 1,
      "color": "bg-gray-900",
      "textColor": "text-white"
    }
  ]
}
\`\`\`

---

## PROFILE OPTIONS (displayed in header, under avatar)

### Social accounts under avatar
Use \`socialAccounts\` array to display social icons with follower counts under the avatar:
- \`platform\`: one of the supported platforms (see list below)
- \`handle\`: username without @ (e.g., "johndoe" not "@johndoe")
- \`followerCount\`: optional number (e.g., 15000 displays as "15k", 1500000 as "1.5M")

### Header display options
- \`showSocialInHeader\`: true = show social icons row under name/bio
- \`showFollowerCount\`: true = show follower count next to each social icon

### Theme & background
- \`theme\`: "light" or "dark"
- \`backgroundColor\`: CSS color (hex like "#f5f5f5", or named color)
- \`primaryColor\`: accent color name (blue, violet, pink, amber, emerald, etc.)

---

## BLOCK TYPES (displayed in the grid)

### LINK - Clickable link block
\`\`\`json
{ "type": "LINK", "title": "My Website", "subtext": "Visit my portfolio", "content": "https://example.com", "colSpan": 3, "rowSpan": 3 }
\`\`\`

### TEXT - Text/note block
\`\`\`json
{ "type": "TEXT", "title": "Hello!", "content": "Welcome to my page. I'm a developer passionate about open source.", "colSpan": 3, "rowSpan": 3 }
\`\`\`

### SOCIAL - Large social block with branding
\`\`\`json
{ "type": "SOCIAL", "title": "Follow me", "subtext": "@myhandle", "socialPlatform": "instagram", "socialHandle": "myhandle", "colSpan": 3, "rowSpan": 3 }
\`\`\`
Note: Use this for featured social networks you want to highlight in the grid.

### SOCIAL_ICON - Small icon-only social block (1x1 cell)
\`\`\`json
{ "type": "SOCIAL_ICON", "socialPlatform": "github", "socialHandle": "myusername", "colSpan": 1, "rowSpan": 1 }
\`\`\`
Note: Perfect for a row of small social icons. Use colSpan: 1, rowSpan: 1.

### MEDIA - Image/GIF block
\`\`\`json
{ "type": "MEDIA", "title": "My photo", "imageUrl": "https://example.com/image.jpg", "colSpan": 3, "rowSpan": 3 }
\`\`\`

### MAP - Google Maps location
\`\`\`json
{ "type": "MAP", "title": "Paris, France", "content": "Paris, France", "colSpan": 3, "rowSpan": 3 }
\`\`\`

### SPACER - Empty spacing block
\`\`\`json
{ "type": "SPACER", "colSpan": 3, "rowSpan": 1 }
\`\`\`

---

## SUPPORTED SOCIAL PLATFORMS

x, instagram, tiktok, youtube, github, gitlab, linkedin, facebook, twitch, dribbble, medium, devto, reddit, pinterest, threads, bluesky, mastodon, substack, patreon, kofi, buymeacoffee, snapchat, discord, telegram, whatsapp, spotify, website, custom

---

## GRID SYSTEM

- Grid is 9 columns wide (gridColumn: 1-9)
- Rows start at 1 and extend as needed (gridRow: 1, 2, 3...)
- colSpan: block width (1-9 cells)
- rowSpan: block height (1-50 cells)
- Common sizes: 3x3 (standard), 6x3 (wide), 3x6 (tall), 9x3 (full width), 1x1 (icon)
- BLOCKS MUST NOT OVERLAP!

---

## VISUAL STYLE GUIDE

**The user selected: ${VISUAL_STYLES.find((s) => s.value === visualStyle)?.label || visualStyle}**

Apply these style guidelines:

${
  visualStyle === 'modern'
    ? `### Modern Style
- Theme: "light"
- Clean, contemporary look with subtle contrasts
- Primary colors: violet, indigo, blue
- Backgrounds: bg-white, bg-gray-100 for light blocks, bg-gray-900 for accent
- Use subtle gradients: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
- Rounded corners, subtle shadows`
    : ''
}
${
  visualStyle === 'minimalist'
    ? `### Minimalist Style
- Theme: "light"
- Simple, clean, lots of whitespace
- Primary colors: gray, slate
- Backgrounds: mostly bg-white, bg-gray-50, with one or two bg-gray-900 accents
- Avoid gradients, keep it simple
- Muted, neutral palette`
    : ''
}
${
  visualStyle === 'colorful'
    ? `### Colorful Style
- Theme: "light"
- Vibrant, playful, dynamic
- Mix multiple colors: pink, violet, cyan, amber, emerald
- Backgrounds: bg-pink-500, bg-violet-500, bg-cyan-500, bg-amber-500
- Use bold gradients: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
- High contrast, energetic feel`
    : ''
}
${
  visualStyle === 'dark'
    ? `### Dark Style
- Theme: "dark"
- Elegant dark mode
- backgroundColor: "#0f0f0f" or "#1a1a2e"
- Primary colors: violet, purple, cyan for accents on dark
- Backgrounds: bg-gray-900, bg-slate-800, bg-gray-800
- Text: text-white, text-gray-100
- Use glowing gradients: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"`
    : ''
}
${
  visualStyle === 'professional'
    ? `### Professional Style
- Theme: "light"
- Corporate, serious, trustworthy
- Primary colors: blue, slate, gray
- Backgrounds: bg-blue-500, bg-slate-800, bg-white
- Clean lines, no playful elements
- Conservative color choices`
    : ''
}
${
  visualStyle === 'playful'
    ? `### Playful Style
- Theme: "light"
- Fun, creative, quirky
- Primary colors: pink, amber, cyan, violet
- Backgrounds: bg-pink-500, bg-amber-100, bg-cyan-500
- Use fun gradients: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
- Mix colors freely, be creative!`
    : ''
}

---

## COLORS (Tailwind classes)

### Backgrounds
bg-gray-900, bg-gray-800, bg-slate-800, bg-white, bg-gray-100
bg-violet-500, bg-purple-500, bg-indigo-500, bg-blue-500, bg-cyan-500
bg-emerald-500, bg-teal-500, bg-green-500
bg-pink-500, bg-rose-500, bg-red-500
bg-amber-100, bg-amber-500, bg-orange-500, bg-yellow-500

### Custom gradients (use customBackground instead of color)
"customBackground": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

### Text colors
text-white, text-black, text-gray-900, text-gray-100, text-gray-700

---

## IMAGES & MEDIA

You can include images in the Bento:

### Avatar image (profile.avatarUrl)
- Search for the user's profile picture on their social networks
- Or suggest a placeholder: "" (user can add later)

### MEDIA blocks (imageUrl)
- Search for relevant images the user might want to showcase
- Look for: profile photos, portfolio images, brand logos
- Use direct image URLs (must end in .jpg, .png, .gif, .webp or be a valid image URL)
- Example sources: user's website, social media posts, portfolio

### Background image (profile.backgroundImage)
- Optional: suggest a background pattern or image
- Can be a subtle texture or gradient image

**If you find relevant images during your search, include them! If not, leave imageUrl/avatarUrl empty.**

---

## IMPORTANT RULES

1. Place social networks in TWO ways:
   - In \`profile.socialAccounts\` array: shows icons with follower counts UNDER the avatar
   - As SOCIAL or SOCIAL_ICON blocks: shows them IN the grid with custom styling

2. For a complete page, include:
   - Profile with socialAccounts (for header icons)
   - A TEXT block for introduction
   - SOCIAL blocks for featured platforms
   - LINK blocks for important links
   - Optionally: MAP, MEDIA blocks

3. Make sure blocks don't overlap (check gridColumn + colSpan doesn't exceed 9)

4. Use followerCount as raw numbers: 15000, 1500000 (app formats them as 15k, 1.5M)

---

## ⚠️ DATA VERIFICATION (CRITICAL)

**BEFORE generating the JSON, you MUST verify the data:**

### If you have internet access:
1. **Search broadly for the user** - Google their name/username to find all their profiles
2. **Visit their social profiles** to verify handles and get follower counts
3. **Look for their profile pictures** - find a good avatar image URL
4. **Find relevant images** for MEDIA blocks (portfolio, photos, etc.)
5. **Check their website** for additional links, bio info, and images
6. **Verify all URLs** are valid and point to real content
7. Use REAL, VERIFIED data in the JSON

### Expand your search:
- Search "[username] social media" to find all profiles
- Search "[username] portfolio" or "[username] website" for images
- Look at their Twitter/X, Instagram, LinkedIn for profile photos
- Check if they have a YouTube banner, Twitch panels, etc.

### If you DON'T have internet access:
1. **ASK the user to confirm** before generating the JSON:
   - "What is your exact Instagram handle?"
   - "How many followers do you have on YouTube?"
   - "Do you have a profile picture URL I can use?"
   - "Any images you'd like to include in MEDIA blocks?"
2. **List all uncertain data** and request confirmation
3. **Don't guess or make up** follower counts, handles, or image URLs
4. Wait for user confirmation before providing the final JSON

### Data to verify:
- [ ] Social media handles (exact spelling)
- [ ] Follower/subscriber counts (approximate is OK, but ask if unsure)
- [ ] Website URLs (must be valid)
- [ ] YouTube channel ID (if using YouTube blocks)
- [ ] Location for MAP blocks
- [ ] Profile picture / avatar URL
- [ ] Images for MEDIA blocks (if any)

**DO NOT INVENT DATA. When in doubt, ASK!**
**DO include images if you find them during your search!**

---

## OUTPUT FORMAT

If all data is verified → Reply ONLY with the JSON, no explanation, directly parseable.

If data needs confirmation → First ask your questions, then provide the JSON after user confirms.`;
  }, [name, bio, socialUrls, visualStyle, customRequest]);

  // Copy prompt to clipboard
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Validate and import JSON
  const handleImport = () => {
    setJsonError(null);
    setImportSuccess(false);

    if (!jsonInput.trim()) {
      setJsonError('Please paste the JSON generated by the AI');
      return;
    }

    try {
      // Try to parse the JSON
      let parsed = JSON.parse(jsonInput.trim());

      // Handle case where AI wraps in markdown code block
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }

      // Basic validation
      if (!parsed.profile && !parsed.blocks) {
        setJsonError('Invalid JSON: missing "profile" or "blocks"');
        return;
      }

      // Add required fields if missing
      const bentoJson: BentoJSON = {
        id: `ai_${Date.now()}`,
        name: parsed.name || name || 'My AI Bento',
        version: '1.0',
        profile: {
          name: parsed.profile?.name || name || 'My Bento',
          bio: parsed.profile?.bio || bio || '',
          avatarUrl: parsed.profile?.avatarUrl || '',
          theme: parsed.profile?.theme || 'light',
          primaryColor: parsed.profile?.primaryColor || 'blue',
          showBranding: parsed.profile?.showBranding ?? true,
          analytics: { enabled: false, supabaseUrl: '' },
          socialAccounts: parsed.profile?.socialAccounts || [],
        },
        blocks: (parsed.blocks || []).map((block: Record<string, unknown>, index: number) => ({
          id: block.id || `block_${index + 1}`,
          type: block.type || 'TEXT',
          title: block.title || '',
          subtext: block.subtext || '',
          content: block.content || '',
          colSpan: block.colSpan || 3,
          rowSpan: block.rowSpan || 3,
          gridColumn: block.gridColumn || 1,
          gridRow: block.gridRow || 1,
          color: block.color || 'bg-gray-900',
          textColor: block.textColor || 'text-white',
          socialPlatform: block.socialPlatform,
          socialHandle: block.socialHandle,
          imageUrl: block.imageUrl,
        })),
      };

      // Import the bento
      const newBento = importBentoFromJSON(bentoJson);
      setImportSuccess(true);

      // Notify parent and close after a short delay
      setTimeout(() => {
        onBentoImported(newBento);
        handleClose();
      }, 1000);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setJsonError(`Invalid JSON: ${errorMessage}`);
    }
  };

  // Extract JSON from markdown code blocks if present
  const cleanJsonInput = (input: string): string => {
    // Remove markdown code block markers
    let cleaned = input.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    return cleaned.trim();
  };

  const handleJsonInputChange = (value: string) => {
    setJsonInput(cleanJsonInput(value));
    setJsonError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 pb-4 flex justify-between items-start border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">
                      {step === 'prompt' ? 'Generate with AI' : 'Import result'}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                      <Beaker size={12} />
                      Experimental
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {step === 'prompt'
                      ? 'Step 1/2 - Customize and copy the prompt'
                      : 'Step 2/2 - Paste the generated JSON'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {step === 'prompt' ? (
                <div className="space-y-5">
                  {/* User info form */}
                  <div className="space-y-4">
                    {/* Info banner */}
                    <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                      <Sparkles size={18} className="text-violet-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-violet-700">
                        <p className="font-medium">Use your favorite AI!</p>
                        <p className="text-violet-600 mt-0.5">
                          This feature works with any AI chat: ChatGPT, Claude, Gemini, Mistral,
                          Llama, or any other. Copy the prompt and paste it into your preferred AI
                          assistant.
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      Fill in your information to customize the prompt. The AI will use this data to
                      create your Bento.
                    </p>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Name / Username
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Bio / Description
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Passionate web developer, content creator..."
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Social URLs */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Social network URLs
                      </label>
                      <div className="space-y-2">
                        {socialUrls.map((url, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => updateSocialUrl(index, e.target.value)}
                              placeholder="https://instagram.com/myusername"
                              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                            {socialUrls.length > 1 && (
                              <button
                                onClick={() => removeSocialUrl(index)}
                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addSocialUrl}
                          className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                        >
                          <Plus size={16} />
                          Add a network
                        </button>
                      </div>
                    </div>

                    {/* Visual Style */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Visual style
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {VISUAL_STYLES.map((style) => (
                          <button
                            key={style.value}
                            onClick={() => setVisualStyle(style.value)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              visualStyle === style.value
                                ? 'border-violet-500 bg-violet-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-900">{style.label}</div>
                            <div className="text-xs text-gray-500">{style.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Request */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Specific request (optional)
                      </label>
                      <textarea
                        value={customRequest}
                        onChange={(e) => setCustomRequest(e.target.value)}
                        placeholder="E.g.: I'd like to highlight my YouTube channel, add a map of my city..."
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Generated Prompt */}
                  <div className="border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Generated prompt
                      </label>
                      <button
                        onClick={copyPrompt}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          copied
                            ? 'bg-green-100 text-green-700'
                            : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                        {generatedPrompt}
                      </pre>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Copy this prompt and paste it into ChatGPT, Claude, or your favorite AI.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Warning banner */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">
                        Warning: This will replace ALL your data
                      </p>
                      <p className="text-sm text-amber-700 mt-1">
                        Importing this JSON will create a <strong>new Bento</strong> and replace
                        your current work. Make sure to export/save your current Bento first if you
                        want to keep it.
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Paste here the JSON generated by the AI. It will be automatically imported to
                    create your Bento.
                  </p>

                  {/* JSON Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      AI-generated JSON
                    </label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => handleJsonInputChange(e.target.value)}
                      placeholder='{"name": "My Bento", "profile": {...}, "blocks": [...]}'
                      rows={15}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none font-mono text-sm ${
                        jsonError
                          ? 'border-red-300 bg-red-50'
                          : importSuccess
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200'
                      }`}
                    />
                  </div>

                  {/* Error message */}
                  {jsonError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                      <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-700">Validation error</p>
                        <p className="text-sm text-red-600 mt-1">{jsonError}</p>
                      </div>
                    </div>
                  )}

                  {/* Success message */}
                  {importSuccess && (
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-700">Import successful!</p>
                        <p className="text-sm text-green-600 mt-1">
                          Your Bento has been created. Redirecting...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 pt-3 border-t border-gray-100 shrink-0">
              <div className="flex gap-3">
                {step === 'import' && (
                  <button
                    onClick={() => setStep('prompt')}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                )}
                {step === 'prompt' ? (
                  <button
                    onClick={() => setStep('import')}
                    className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    I have my JSON
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleImport}
                    disabled={importSuccess}
                    className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Sparkles size={18} />
                    Import my Bento
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGeneratorModal;
