# Sorveg Web - Deployment Guide

## Overview

Sorveg Web is a static React (Vite) application that provides a clean, professional interface for the Sorveg API. The site consists of two main pages:

- **Landing Page** (`/`): Hero section with live API examples and feature highlights
- **Playground** (`/playground`): Interactive playground for testing Sorveg skills with shareable links

## Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS 4** for styling
- **shadcn/ui** for pre-built components
- **Wouter** for client-side routing

### API Integration
The frontend calls the existing Sorveg API directly:
- **Endpoint**: `https://api.sorveg.com/api/skills/[skill-name]`
- **Method**: POST with JSON payload `{ prompt: "..." }`
- **No backend required**: Static site calls API from browser

## Development

### Local Setup
```bash
cd /home/ubuntu/sorveg-web
pnpm install
pnpm dev
```

The dev server runs on `http://localhost:3000` with hot module reloading.

### Project Structure
```
client/
  src/
    pages/
      Home.tsx          # Landing page with hero and examples
      Playground.tsx    # Interactive playground
    components/         # Reusable UI components
    contexts/           # React contexts (theme, etc.)
    lib/                # Utilities and helpers
    index.css           # Global styles and design tokens
    App.tsx             # Routes and app layout
  public/
    _redirects          # Cloudflare Pages SPA routing
    index.html          # HTML entry point
```

### Design Philosophy: Premium Clarity

The design emphasizes clarity, professionalism, and trust through:
- **Clean white background** with blue accents
- **Asymmetric hero layout** avoiding generic centered patterns
- **Monospace result blocks** for code/JSON output
- **Instant feedback** on all interactions
- **Execution traces** showing step-by-step results

## Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account with a domain
- GitHub repository with this code

### Steps

1. **Connect GitHub Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - **Framework preset**: None (custom)
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave blank)

3. **Environment Variables** (if needed)
   - No secrets required for this static site
   - API calls go directly to `api.sorveg.com`

4. **Deploy**
   - Cloudflare automatically deploys on every push to main
   - Site is available at `[project-name].pages.dev`

### Custom Domain Setup

1. **Point domain to Cloudflare**
   - Update DNS records to use Cloudflare nameservers
   - Or add CNAME record: `skills.sorveg.com CNAME [project].pages.dev`

2. **Configure in Cloudflare Pages**
   - Go to project settings → Custom domains
   - Add `skills.sorveg.com`
   - Cloudflare automatically provisions SSL

## URL Structure

### Landing Page
- **Path**: `/`
- **URL**: `https://skills.sorveg.com/`

### Playground
- **Path**: `/playground`
- **URL**: `https://skills.sorveg.com/playground`
- **Shareable links**: `https://skills.sorveg.com/playground?prompt=sort%20%5B64%2C34%2C25%5D`

## API Integration Details

### Skill Detection
The playground automatically detects which skill to call based on keywords in the prompt:
- **"sort"** → calls `/api/skills/sort`
- **"shortest"** or **"path"** → calls `/api/skills/shortest-path`
- **"knapsack"** → calls `/api/skills/knapsack`
- **Default** → calls `/api/skills/sort`

### Error Handling
- If API call fails, the playground shows a demo result
- Toast notifications inform the user of any issues
- Execution trace shows step-by-step breakdown of results

### Shareable Links
- Playground URL updates with `?prompt=...` parameter
- Copy button creates shareable link with current prompt
- Loading a shared link auto-executes the prompt

## Performance Considerations

### Build Optimization
- Vite bundles and minifies all code
- Tree-shaking removes unused dependencies
- CSS is purged to include only used classes

### Runtime Performance
- React 19 with automatic batching
- Wouter for lightweight client-side routing
- No unnecessary re-renders with proper hook usage

### Caching
- Static assets are cached by Cloudflare
- API responses are not cached (fresh results each time)

## Monitoring & Analytics

### Cloudflare Analytics
- Built-in analytics in Cloudflare Pages dashboard
- Tracks page views, unique visitors, requests

### Browser Console
- Check browser DevTools for any errors
- API calls visible in Network tab

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Playground Not Executing
- Check browser console for errors
- Verify API endpoint is accessible: `https://api.sorveg.com/api/skills/sort`
- Check CORS headers if API is blocking requests

### Styling Issues
- Verify Tailwind CSS is properly configured in `vite.config.ts`
- Check `client/src/index.css` for design tokens
- Clear browser cache and rebuild

## Future Enhancements

- Add skill documentation page
- Implement result history/bookmarks
- Add export functionality (JSON, CSV)
- Create API documentation page
- Add dark mode toggle
- Implement result caching with localStorage

## Support

For issues or questions:
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Review Cloudflare Pages deployment logs
4. Check GitHub Actions build logs
