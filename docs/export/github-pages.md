# Deploy to GitHub Pages

Host your bento for free using GitHub Pages.

## Automatic Deployment (Recommended)

The export includes a GitHub Actions workflow that deploys automatically.

### Step 1: Create Repository

1. Create a new repository on GitHub
2. Push your exported project:

```bash
cd my-bento
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-bento.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings → Pages**
3. Under **Source**, select **GitHub Actions**

### Step 3: Deploy

Push any change to trigger the workflow:

```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

### Step 4: Access Your Site

Your bento is live at:
```
https://username.github.io/my-bento/
```

## Manual Deployment

If you prefer manual control:

### Install gh-pages

```bash
npm install gh-pages --save-dev
```

### Add Deploy Script

In `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Configure Base URL

In `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/my-bento/',
  // ... other config
})
```

### Deploy

```bash
npm run deploy
```

## Custom Domain

### Step 1: Add CNAME

Create `public/CNAME` with your domain:

```
mybento.com
```

### Step 2: Configure DNS

Add these records at your domain registrar:

**For apex domain (mybento.com):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For subdomain (www.mybento.com):**
```
CNAME   www   username.github.io
```

### Step 3: Enable HTTPS

In **Settings → Pages**, check **Enforce HTTPS**.

## GitHub Actions Workflow

The included `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Troubleshooting

### 404 errors

Ensure `base` in `vite.config.ts` matches your repo name:

```typescript
base: '/your-repo-name/',
```

### Assets not loading

Check that asset paths use the correct base URL. Vite handles this automatically if `base` is configured.

### Workflow not running

1. Check **Actions** tab for errors
2. Ensure workflow file is in `.github/workflows/`
3. Verify branch name matches trigger

## Limitations

GitHub Pages is great for static sites but has limits:

- 1GB repository size limit
- 100GB bandwidth per month
- No server-side code

For most bentos, these limits are never reached.

## Pricing

GitHub Pages is **free** for public repositories, including:

- Custom domains
- HTTPS
- Unlimited deployments

