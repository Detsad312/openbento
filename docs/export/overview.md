# Export Overview

When you export your bento, OpenBento generates a complete, production-ready React project.

## What's Included

Your exported project contains:

```
my-bento/
├── src/
│   ├── App.tsx           # Main component with your bento
│   ├── main.tsx          # Entry point
│   ├── index.css         # Tailwind styles
│   └── assets/           # Your images
├── public/
│   └── favicon.ico
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS configuration
└── [deploy configs]      # Platform-specific configs
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI framework |
| Vite | Build tool |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Icons | Social icons |

## Deployment Configs

The export includes ready-to-use configurations for:

- **Vercel** - `vercel.json`
- **Netlify** - `netlify.toml`
- **GitHub Pages** - `.github/workflows/deploy.yml`
- **Docker** - `Dockerfile`
- **Heroku** - `Procfile`

## How to Export

1. Click **Export** in the builder toolbar
2. Choose your preferred deployment target
3. Download the ZIP file
4. Extract and deploy!

## Running Locally

After extracting the export:

```bash
cd my-bento
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to preview.

## Building for Production

```bash
npm run build
```

The `dist` folder contains your production-ready site.

## Customization

The exported code is yours to modify:

- Edit `src/App.tsx` for layout changes
- Modify `tailwind.config.js` for theme changes
- Update `index.html` for SEO meta tags
- Add custom CSS in `src/index.css`

## Analytics

If you enabled analytics in the builder, the export includes:

- Automatic page view tracking
- Click tracking on blocks
- Integration with your Supabase Edge Functions

## Next Steps

Choose your deployment platform:

- [Vercel](/doc/export/vercel) - Easiest option
- [Netlify](/doc/export/netlify) - Great free tier
- [GitHub Pages](/doc/export/github-pages) - Free with GitHub
- [Docker](/doc/export/docker) - Self-hosted option

