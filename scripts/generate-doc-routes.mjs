#!/usr/bin/env node

/**
 * Post-build script to generate static HTML files for each documentation route.
 * This enables GitHub Pages (and other static hosts) to serve the docs without SPA routing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const docsDir = path.join(__dirname, '..', 'docs');

// Read the base index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Find all markdown files in docs/
function findMarkdownFiles(dir, basePath = '') {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'images') {
      routes.push(
        ...findMarkdownFiles(path.join(dir, entry.name), path.join(basePath, entry.name))
      );
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = path.join(basePath, entry.name.replace('.md', '')).replace(/\\/g, '/');
      if (slug === 'index') {
        routes.push('');
      } else {
        routes.push(slug);
      }
    }
  }

  return routes;
}

// Get all doc routes
const docRoutes = findMarkdownFiles(docsDir);

console.log('Generating static HTML files for documentation routes...');
console.log(`Found ${docRoutes.length} routes:`);

// Create /doc directory
const docDistDir = path.join(distDir, 'doc');
if (!fs.existsSync(docDistDir)) {
  fs.mkdirSync(docDistDir, { recursive: true });
}

// Generate index.html for /doc
fs.writeFileSync(path.join(docDistDir, 'index.html'), indexHtml);
console.log('  /doc/index.html');

// Generate index.html for each route
for (const route of docRoutes) {
  if (!route) continue; // Skip empty (index) route, already handled

  const routeDir = path.join(docDistDir, route);

  // Create directory structure
  fs.mkdirSync(routeDir, { recursive: true });

  // Write index.html
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
  console.log(`  /doc/${route}/index.html`);
}

// Also create a 404.html that redirects to handle any missed routes
const notFoundHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Redirect to the SPA with the current path
    const path = window.location.pathname;
    const base = '${process.env.GITHUB_ACTIONS ? '/openbento' : ''}';
    if (path.startsWith(base)) {
      sessionStorage.setItem('redirect', path);
      window.location.replace(base + '/');
    }
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log('  /404.html');

console.log('\\nDone! Static doc routes generated successfully.');
