# Installation

This guide covers how to install and run the OpenBento builder locally.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- npm (included with Node.js)

## Quick Install

1. Clone the repository:

```bash
git clone https://github.com/yoanbernabeu/openbento.git
cd openbento
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

That's it! The builder is now running locally.

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be served by any static file server.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |

## Next Steps

- [Configuration](/doc/builder/configuration) - Customize the builder
- [Deploy Builder](/doc/builder/deploy) - Host your own instance

