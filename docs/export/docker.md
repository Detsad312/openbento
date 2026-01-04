# Deploy with Docker

Self-host your bento using Docker for full control.

## Quick Start

The export includes a Dockerfile. Build and run:

```bash
cd my-bento
docker build -t my-bento .
docker run -d -p 8080:80 my-bento
```

Open [http://localhost:8080](http://localhost:8080)

## Docker Compose

Create a `compose.yml`:

```yaml
services:
  bento:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run:

```bash
docker compose up -d
```

## Multi-Stage Dockerfile

The included Dockerfile uses multi-stage builds for small images:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Nginx Configuration

The export includes an optimized `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

## Deploy to a VPS

### Step 1: Build Image

```bash
docker build -t my-bento .
```

### Step 2: Save Image

```bash
docker save my-bento > my-bento.tar
```

### Step 3: Transfer to Server

```bash
scp my-bento.tar user@server:/path/to/
```

### Step 4: Load and Run

On your server:

```bash
docker load < my-bento.tar
docker run -d -p 80:80 --name my-bento my-bento
```

## Using a Registry

### Push to Docker Hub

```bash
docker tag my-bento username/my-bento:latest
docker push username/my-bento:latest
```

### Pull on Server

```bash
docker pull username/my-bento:latest
docker run -d -p 80:80 username/my-bento
```

## With Traefik (Reverse Proxy)

For multiple sites with automatic HTTPS:

```yaml
services:
  bento:
    build: .
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bento.rule=Host(`mybento.com`)"
      - "traefik.http.routers.bento.tls.certresolver=letsencrypt"
    networks:
      - traefik

networks:
  traefik:
    external: true
```

## With Caddy (Simpler Alternative)

`Caddyfile`:

```
mybento.com {
    reverse_proxy bento:80
}
```

`compose.yml`:

```yaml
services:
  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on:
      - bento

  bento:
    build: .

volumes:
  caddy_data:
```

## Health Checks

Add a health check to your compose file:

```yaml
services:
  bento:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Resource Limits

Limit container resources:

```yaml
services:
  bento:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 128M
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker logs my-bento
```

### Port already in use

Use a different port:
```bash
docker run -d -p 3000:80 my-bento
```

### Permission denied

On Linux, you may need to run Docker with sudo or add your user to the docker group.

