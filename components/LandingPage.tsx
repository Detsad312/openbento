import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ArrowRight,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Download,
  BarChart3,
  Layers,
  Grid3X3,
  Palette,
  Server,
  BookOpen,
} from 'lucide-react';
import BlockPreview from './BlockPreview';
import { BlockData, BlockType } from '../types';

interface LandingPageProps {
  onStart: () => void;
}

// Demo blocks for the hero preview
const demoBlocks: BlockData[] = [
  {
    id: 'demo-1',
    type: BlockType.SOCIAL,
    title: 'Follow me',
    subtext: '@alexchen',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 1,
    gridRow: 1,
    color: 'bg-violet-500',
    textColor: 'text-white',
    socialPlatform: 'instagram',
    socialHandle: 'alexchen',
  },
  {
    id: 'demo-2',
    type: BlockType.LINK,
    title: 'My Portfolio',
    subtext: 'Check out my work',
    content: 'https://example.com',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 4,
    gridRow: 1,
    color: 'bg-gray-900',
    textColor: 'text-white',
  },
  {
    id: 'demo-3',
    type: BlockType.TEXT,
    title: 'Hello! 👋',
    content: 'Building the future, one pixel at a time.',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 7,
    gridRow: 1,
    color: 'bg-amber-100',
    textColor: 'text-gray-900',
  },
  {
    id: 'demo-4',
    type: BlockType.SOCIAL,
    title: 'GitHub',
    subtext: '@alexchen',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 1,
    gridRow: 4,
    color: 'bg-gray-800',
    textColor: 'text-white',
    socialPlatform: 'github',
    socialHandle: 'alexchen',
  },
  {
    id: 'demo-5',
    type: BlockType.MAP,
    title: 'San Francisco',
    content: 'San Francisco, CA',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 4,
    gridRow: 4,
    color: 'bg-white',
    textColor: 'text-gray-900',
  },
  {
    id: 'demo-6',
    type: BlockType.SOCIAL,
    title: 'X (Twitter)',
    subtext: '@alexchen',
    colSpan: 3,
    rowSpan: 3,
    gridColumn: 7,
    gridRow: 4,
    color: 'bg-black',
    textColor: 'text-white',
    socialPlatform: 'x',
    socialHandle: 'alexchen',
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                B
              </div>
              <span className="font-bold text-lg tracking-tight">OpenBento</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`${import.meta.env.BASE_URL}doc`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
              >
                <BookOpen size={18} />
                <span>Docs</span>
              </a>
              <a
                href="https://github.com/yoanbernabeu/openbento"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
              >
                <Github size={18} />
                <span>Star on GitHub</span>
              </a>
              <button
                onClick={onStart}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 rounded-full blur-[120px] opacity-30" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {/* Bento.me Sunset Banner */}
            <a
              href="https://bento.me/home/bento-sunset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-medium text-amber-800 mb-6 hover:shadow-md transition-all group"
            >
              <span className="text-lg">🌅</span>
              <span>
                Bento.me shuts down Feb 13, 2026 —{' '}
                <span className="underline group-hover:text-orange-900">
                  Don't be sad, OpenBento is here!
                </span>
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
              <span className="text-gray-900">Build your bento-style</span>
              <br />
              <span className="relative">
                static site
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M2 10C50 2 150 2 298 10"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-gray-900"> in minutes.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
              The open-source visual builder for stunning link-in-bio pages. Drag-and-drop editor,
              export to React/Vite/Tailwind, deploy anywhere. Your data stays yours — forever.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={onStart}
              className="group h-14 px-8 rounded-2xl bg-gray-900 text-white font-semibold text-lg flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
            >
              Start Creating
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight size={18} />
              </div>
            </button>
            <a
              href="https://github.com/yoanbernabeu/openbento"
              target="_blank"
              rel="noreferrer"
              className="h-14 px-8 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold text-lg flex items-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <Star size={20} className="text-amber-500" />
              Star on GitHub
            </a>
          </motion.div>

          {/* Hero Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Browser Frame */}
            <div className="bg-gray-200 rounded-[28px] p-1 shadow-2xl border border-gray-200">
              <div className="bg-white rounded-[24px] overflow-hidden">
                {/* Browser Bar */}
                <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-1.5 text-sm text-gray-500 font-mono">
                      yourname.github.io/bento
                    </div>
                  </div>
                </div>

                {/* Preview Content - Real Bento Grid */}
                <div className="bg-[#FAFAFA] p-4 md:p-6 min-h-[350px]">
                  <div
                    className="grid gap-2 w-full h-full"
                    style={{
                      gridTemplateColumns: 'repeat(9, 1fr)',
                      gridTemplateRows: 'repeat(6, 1fr)',
                      minHeight: '300px',
                    }}
                  >
                    {demoBlocks.map((block) => (
                      <BlockPreview
                        key={block.id}
                        block={block}
                        enableTiltEffect={false}
                        onClickBlock={() => {}}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deploy Targets */}
      <section className="py-16 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
            Export & Deploy Anywhere
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {['Vercel', 'Netlify', 'GitHub Pages', 'Docker', 'VPS', 'Heroku'].map((platform, i) => (
              <span
                key={i}
                className="text-xl font-bold text-gray-300 hover:text-gray-500 transition-colors"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Block Types Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">
                Block Types
              </span>
              <h2 className="text-4xl font-bold tracking-tight mt-3 mb-4">
                7 content blocks to mix and match
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Create unique layouts with different content types on a flexible 9×9 grid.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🔗', title: 'Links', desc: 'Clickable links with titles & subtitles' },
              { icon: '🖼️', title: 'Media', desc: 'Images & GIFs with position control' },
              { icon: '📺', title: 'YouTube', desc: 'Single video, grid, or list mode' },
              { icon: '📝', title: 'Text', desc: 'Notes, quotes, and bio sections' },
              { icon: '🌐', title: 'Social', desc: '26+ platforms with branded colors' },
              { icon: '📍', title: 'Map', desc: 'Interactive Google Maps embed' },
              { icon: '⬜', title: 'Spacer', desc: 'Empty blocks for layout control' },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all"
              >
                <div className="text-2xl mb-3">{block.icon}</div>
                <h3 className="text-lg font-bold mb-1">{block.title}</h3>
                <p className="text-gray-500 text-sm">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                Features
              </span>
              <h2 className="text-4xl font-bold tracking-tight mt-3 mb-4">
                Everything you need, nothing you don't
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                A complete toolkit to create, customize, and deploy your bento site.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Grid3X3 size={24} />,
                title: 'Visual Drag & Drop',
                desc: 'Intuitive 9×9 grid editor. Drag, resize, and position blocks freely with real-time preview.',
                bg: 'bg-pink-50',
                border: 'border-pink-100',
                iconBg: 'bg-pink-100',
                iconColor: 'text-pink-600',
              },
              {
                icon: <Palette size={24} />,
                title: 'Full Customization',
                desc: 'Colors, gradients, custom backgrounds. Avatars with borders, shadows & multiple shapes.',
                bg: 'bg-violet-50',
                border: 'border-violet-100',
                iconBg: 'bg-violet-100',
                iconColor: 'text-violet-600',
              },
              {
                icon: <Download size={24} />,
                title: 'Export to React',
                desc: 'Download a complete Vite + React + TypeScript + Tailwind project, ready to deploy.',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
              },
              {
                icon: <Server size={24} />,
                title: 'Multi-Platform Deploy',
                desc: 'Auto-generated configs for Vercel, Netlify, GitHub Pages, Docker, VPS & Heroku.',
                bg: 'bg-amber-50',
                border: 'border-amber-100',
                iconBg: 'bg-amber-100',
                iconColor: 'text-amber-600',
              },
              {
                icon: <Shield size={24} />,
                title: 'Privacy First',
                desc: 'No tracking, no account, no server required. All data stays in your browser localStorage.',
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
                iconBg: 'bg-emerald-100',
                iconColor: 'text-emerald-600',
              },
              {
                icon: <Layers size={24} />,
                title: 'Multiple Bentos',
                desc: 'Save and manage multiple projects locally. Switch between them instantly.',
                bg: 'bg-gray-50',
                border: 'border-gray-200',
                iconBg: 'bg-gray-100',
                iconColor: 'text-gray-600',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${feature.bg} p-8 rounded-3xl border ${feature.border} hover:shadow-lg transition-all group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                Optional Analytics
              </span>
              <h2 className="text-4xl font-bold tracking-tight mt-3 mb-4">
                Track visits with Supabase
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Want to know how your bento performs? Enable optional analytics powered by Supabase
                Edge Functions. Self-hosted, privacy-friendly, and completely under your control.
              </p>
              <ul className="space-y-3">
                {[
                  'Page views & unique visitors',
                  'Referrer tracking',
                  'Self-hosted on your Supabase project',
                  'No third-party cookies or trackers',
                  'Admin dashboard included',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Zap size={12} className="text-indigo-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <BarChart3 size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Analytics Dashboard</h4>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">2,847</p>
                      <p className="text-sm text-gray-500">Total views</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-emerald-600">+24%</p>
                      <p className="text-xs text-gray-400">vs last month</p>
                    </div>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-200 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Social Integration
            </span>
            <h2 className="text-3xl font-bold tracking-tight mt-3 mb-4">
              26+ Social Platforms Supported
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Connect all your profiles with branded icons and automatic URL generation.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-gray-400">
            {[
              'X (Twitter)',
              'Instagram',
              'TikTok',
              'YouTube',
              'GitHub',
              'GitLab',
              'LinkedIn',
              'Facebook',
              'Twitch',
              'Dribbble',
              'Medium',
              'Dev.to',
              'Reddit',
              'Pinterest',
              'Threads',
              'Bluesky',
              'Mastodon',
              'Substack',
              'Patreon',
              'Ko-fi',
              'Buy Me a Coffee',
              'Snapchat',
              'Discord',
              'Telegram',
              'WhatsApp',
            ].map((platform, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-gray-50 rounded-full text-sm font-medium border border-gray-100"
              >
                {platform}
              </span>
            ))}
            <span className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium">
              + Custom links
            </span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              How it works
            </span>
            <h2 className="text-4xl font-bold tracking-tight mt-3">Ready in 4 steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Design',
                desc: 'Drag blocks onto the 9×9 grid',
              },
              {
                step: '02',
                title: 'Customize',
                desc: 'Add content, colors & media',
              },
              {
                step: '03',
                title: 'Export',
                desc: 'Download as React/Vite project',
              },
              {
                step: '04',
                title: 'Deploy',
                desc: 'Host on Vercel, Netlify, or anywhere',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-white/10 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Your exported project includes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { name: 'React', color: 'text-cyan-600' },
              { name: 'Vite', color: 'text-purple-600' },
              { name: 'TypeScript', color: 'text-blue-600' },
              { name: 'Tailwind CSS', color: 'text-sky-500' },
              { name: 'Lucide Icons', color: 'text-amber-600' },
              { name: 'React Icons', color: 'text-pink-600' },
            ].map((tech, i) => (
              <span key={i} className={`text-lg font-bold ${tech.color}`}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gray-50" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to build your bento?
            </h2>
            <p className="text-xl text-gray-500 mb-10">
              No sign-up required. No payment. Just start creating and export when you're ready.
            </p>
            <button
              onClick={onStart}
              className="group h-16 px-10 rounded-2xl bg-gray-900 text-white font-semibold text-xl hover:bg-black transition-all shadow-2xl hover:shadow-3xl hover:scale-[1.02] inline-flex items-center gap-3"
            >
              Start Building Now
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 text-sm text-gray-400">Free forever · Open source · MIT License</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                B
              </div>
              <span className="font-semibold">OpenBento</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a
                href={`${import.meta.env.BASE_URL}doc`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors flex items-center gap-2"
              >
                <BookOpen size={16} /> Docs
              </a>
              <a
                href="https://github.com/yoanbernabeu/openbento"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors flex items-center gap-2"
              >
                <Github size={16} /> GitHub
              </a>
              <span>&copy; {new Date().getFullYear()} OpenBento</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
