# Analytics Setup

Track visitors on your exported bento page using Supabase Edge Functions.

## Overview

OpenBento analytics tracks:

- **Page views** - Visits to your bento
- **Clicks** - Interactions with blocks (links, social)
- **Referrers** - Where visitors come from
- **UTM parameters** - Campaign tracking

## Security First

**No API keys are exposed in your exported code!**

The analytics system uses Supabase Edge Functions that handle authentication server-side. Your exported bento only needs the Supabase project URL.

## Setup Guide

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Install Supabase CLI

Follow the [official guide](https://supabase.com/docs/guides/cli) to install the CLI.

### 3. Get Your Credentials

From your Supabase dashboard, collect:

| Credential | Where to find |
|------------|---------------|
| Project Ref | Project Settings |
| Service Role Key | Settings → API |
| Admin Token | Generate any strong random string |

### 4. Deploy Analytics

From the OpenBento repository root:

```bash
SUPABASE_PROJECT_REF=your-project-ref \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
OPENBENTO_ANALYTICS_ADMIN_TOKEN=your-admin-token \
npm run analytics:supabase:init
```

This command:
- Creates the analytics database table
- Sets Edge Function secrets
- Deploys the tracking functions

### 5. Enable in Builder

In the OpenBento builder:

1. Open the sidebar
2. Go to **Analytics (Supabase)**
3. Toggle **Enable analytics**
4. Paste your **Supabase Project URL**
   - Format: `https://xxxx.supabase.co`

### 6. Export Your Bento

When you export, analytics tracking is automatically included.

## Viewing Analytics

### In the Builder

1. Click the **Analytics** button in the sidebar
2. Enter your Admin Token
3. View dashboard with:
   - Total page views
   - Unique visitors
   - Click tracking
   - Top referrers

### API Endpoint

The admin endpoint is:

```
{SUPABASE_URL}/functions/v1/openbento-analytics-admin?siteId=YOUR_SITE_ID&days=30
```

Headers required:
```
x-openbento-admin-token: YOUR_ADMIN_TOKEN
```

## Data Collected

Each event includes:

| Field | Description |
|-------|-------------|
| `event_type` | `page_view` or `click` |
| `site_id` | Your bento identifier |
| `block_id` | Clicked block ID |
| `destination_url` | Link destination |
| `page_url` | Current page |
| `referrer` | Traffic source |
| `utm_*` | Campaign parameters |
| `user_agent` | Browser info |
| `language` | Browser language |
| `screen_*` | Screen dimensions |

## Privacy

OpenBento analytics is privacy-friendly:

- ✅ No third-party cookies
- ✅ No external tracking services
- ✅ Data stored in your Supabase project
- ✅ Full control over data retention
- ✅ GDPR-friendly approach

## Troubleshooting

### Events not appearing

1. Check browser console for errors
2. Verify Edge Functions are deployed:
   ```bash
   supabase functions list
   ```
3. Check function logs:
   ```bash
   supabase functions logs openbento-analytics-track
   ```

### Admin endpoint returns 401

1. Verify admin token matches the secret
2. Check the header name: `x-openbento-admin-token`

### Database errors

1. Ensure migration was applied
2. Verify RLS policies are configured

