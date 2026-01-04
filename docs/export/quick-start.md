# Quick Start: Deploy Your Bento

Deploy your bento in under 5 minutes.

## Step 1: Export

In the builder, click **Export** and download the ZIP file.

## Step 2: Extract

```bash
unzip my-bento.zip
cd my-bento
```

## Step 3: Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts. Done! Your bento is live.

## Alternative: Drag & Drop

1. Build locally: `npm install && npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag your `dist` folder
4. Done!

## Next Steps

- [What's in the export](/doc/export/overview) — Full project structure
- [Vercel](/doc/export/vercel) — Detailed Vercel guide
- [GitHub Pages](/doc/export/github-pages) — Free hosting

