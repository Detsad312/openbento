# Configuration

OpenBento can be customized through environment variables.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ENABLE_LANDING` | Show landing page before builder | `false` |

## Landing Page

By default, the app opens directly on the builder. This makes self-hosting easier as users go straight to the editor.

To enable the landing page:

**Development:**

```bash
VITE_ENABLE_LANDING=true npm run dev
```

**Production build:**

```bash
VITE_ENABLE_LANDING=true npm run build
```

## Data Storage

All user data is stored in the browser's localStorage:

- **No server required** - Everything runs client-side
- **No account needed** - Just start creating
- **Privacy first** - Your data stays on your device

Data is saved automatically as you work. To manage saved bentos:

- Access the **Projects** panel in the sidebar
- Export/import bentos as JSON files for backup

## Tech Stack

The builder is built with:

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

