# Deploy to Netlify

Netlify offers easy deployments with a generous free tier.

## Option 1: Drag & Drop

The fastest way to deploy:

1. Build your project locally:
   ```bash
   cd my-bento
   npm install
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag your `dist` folder onto the page
4. Done! Your site is live.

## Option 2: Git Integration

### Step 1: Push to Git

```bash
cd my-bento
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-bento.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [app.netlify.com/start](https://app.netlify.com/start)
2. Click **Import from Git**
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

## Option 3: Netlify CLI

### Install CLI

```bash
npm i -g netlify-cli
```

### Deploy

```bash
cd my-bento
npm run build
netlify deploy --dir=dist
```

### Production Deploy

```bash
netlify deploy --dir=dist --prod
```

## Custom Domain

1. Go to **Site settings → Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

Free SSL is included automatically.

## netlify.toml

The export includes a `netlify.toml` for configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

1. Go to **Site settings → Environment variables**
2. Add your variables
3. Trigger a new deploy

## Continuous Deployment

With Git integration:

- Every push to `main` triggers a deploy
- Pull requests get preview URLs
- Branch deploys available

## Build Plugins

Netlify offers plugins for optimization:

- **Lighthouse** - Performance audits
- **Image optimization** - Automatic compression
- **Cache** - Faster builds

## Troubleshooting

### Build fails

Check the deploy log for errors. Common issues:

- Missing dependencies
- Node version mismatch (set in `netlify.toml`)

```toml
[build.environment]
  NODE_VERSION = "18"
```

### 404 on page refresh

Ensure the redirect rule is in `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Pricing

- **Free** - 100GB bandwidth, perfect for personal sites
- **Pro** ($19/month) - More bandwidth, team features
- **Business** ($99/month) - Advanced features

Most bentos work great on the free tier.

