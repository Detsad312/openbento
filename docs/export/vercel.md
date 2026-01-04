# Deploy to Vercel

Vercel is the easiest way to deploy your bento. Zero configuration required.

## Option 1: Git Integration (Recommended)

### Step 1: Push to Git

Upload your exported project to GitHub, GitLab, or Bitbucket:

```bash
cd my-bento
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-bento.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your repository
3. Vercel auto-detects Vite configuration
4. Click **Deploy**

### Step 3: Done!

Your bento is live at `https://my-bento.vercel.app`

## Option 2: Vercel CLI

### Install CLI

```bash
npm i -g vercel
```

### Deploy

```bash
cd my-bento
vercel
```

Follow the prompts. Your site deploys in seconds.

### Production Deploy

```bash
vercel --prod
```

## Custom Domain

1. Go to your project in Vercel Dashboard
2. Click **Settings → Domains**
3. Add your domain
4. Update DNS records as instructed

Vercel provides free SSL automatically.

## Environment Variables

If you need environment variables (e.g., for analytics):

1. Go to **Settings → Environment Variables**
2. Add your variables
3. Redeploy for changes to take effect

## Automatic Deployments

With Git integration:

- **Push to main** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview URL for review

## vercel.json

The export includes a `vercel.json` for optimal configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Troubleshooting

### Build fails

1. Check the build logs in Vercel Dashboard
2. Ensure `npm run build` works locally
3. Verify all dependencies are in `package.json`

### 404 on refresh

The included `vercel.json` handles client-side routing. If you modified it, ensure rewrites are configured:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Pricing

- **Hobby** (Free) - Perfect for personal bentos
- **Pro** ($20/month) - Custom domains, more bandwidth
- **Enterprise** - For teams

Most bentos work great on the free tier.

