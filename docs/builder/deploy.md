# Deploy the Builder

Want to host your own OpenBento instance? Here's how to deploy the builder itself.

## Docker (Recommended)

OpenBento provides a multi-platform Docker image supporting AMD64 and ARM64 architectures.

### Quick Start

```bash
docker run -d -p 8080:80 yoanbernabeu/openbento:latest
```

Open [http://localhost:8080](http://localhost:8080)

### Docker Compose

Create a `compose.yml`:

```yaml
services:
  openbento:
    image: yoanbernabeu/openbento:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run:

```bash
docker compose up -d
```

### Build Your Own Image

```bash
# For your current platform
docker build -t my-openbento .

# For multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t my-openbento .
```

### Platform Support

| Architecture | Description |
|-------------|-------------|
| linux/amd64 | Intel/AMD 64-bit (standard servers, PCs) |
| linux/arm64 | ARM 64-bit (Mac M1/M2/M3, AWS Graviton, Raspberry Pi 4+) |

## Static Hosting

Since the builder is a static site, you can host it anywhere:

### Vercel

1. Fork the [OpenBento repository](https://github.com/yoanbernabeu/openbento)
2. Import in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Vite configuration
4. Optionally set `VITE_ENABLE_LANDING=true` in environment variables

### Netlify

1. Fork the repository
2. Import in [Netlify Dashboard](https://app.netlify.com/start)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

The repository includes a GitHub Actions workflow for automatic deployment:

1. Fork the repository
2. Enable GitHub Pages in **Settings → Pages**
3. Set source to **GitHub Actions**
4. Push to `main` branch to trigger deployment

## VPS / Self-Hosted

### Build Locally

```bash
npm install
npm run build
```

### Upload & Configure Nginx

```nginx
server {
    listen 80;
    server_name openbento.yourdomain.com;
    root /var/www/openbento/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### With Caddy

The repository includes a `Caddyfile`:

```
yourdomain.com {
    root * /srv/openbento/dist
    file_server
    try_files {path} /index.html
}
```

## Environment Variables for Deployment

When deploying with landing page enabled:

| Platform | How to set |
|----------|------------|
| Docker | `-e VITE_ENABLE_LANDING=true` at build time |
| Vercel | Project Settings → Environment Variables |
| Netlify | Site Settings → Environment Variables |

> **Note:** Vite environment variables are embedded at build time, not runtime.

