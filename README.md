# Pokedex Lite

A modern, feature-rich Pokédex web application built with Next.js, React, and PokéAPI. Includes search, filtering, favorites, authentication, and smooth animations.

## Features

### ✅ Core Features (Implemented)
- **Data Fetching**: Retrieves Pokémon data from PokéAPI with graceful error handling
- **Responsive Grid UI**: Displays Pokémon cards on mobile, tablet, and desktop
- **Global Search**: Search Pokémon by name across the entire database (not just current page)
- **Type Filtering**: Filter Pokémon by type (Fire, Water, Grass, etc.) globally
- **Pagination**: Navigate between pages of Pokémon with Next/Previous buttons
- **Favorites**: Favorite Pokémon with persistent localStorage storage
- **Detail Modal**: View full stats, abilities, height, and weight in an animated modal
- **Dark/Light Mode**: Automatic theme detection with readable contrast
- **Animations**: Smooth transitions on cards, page changes, and modals
- **Clear Filters**: One-click button to reset all search/filter/favorite selections

### 🔐 Authentication (OAuth)
- GitHub OAuth login
- Google OAuth login
- Guest mode (continue without signing in)
- User session display in header

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **API**: PokéAPI (free, no auth required)
- **State Management**: React Context (Favorites, Auth)
- **Storage**: localStorage (favorites), cookies (auth sessions)

## Installation

### Prerequisites
- Node.js 18+ and npm

### 1. Clone and Setup

```powershell
cd pokedex-lite
npm install
```

### 2. Configure OAuth (Optional)

To enable login with GitHub and Google, set up OAuth credentials:

**GitHub OAuth:**
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

**Google OAuth:**
1. Go to https://console.cloud.google.com
2. Create OAuth 2.0 Client ID (Web application)
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Client Secret

### 3. Environment Variables

Copy `.env.local.example` to `.env.local`:

```powershell
cp .env.local.example .env.local
```

Edit `.env.local` with your OAuth credentials:

```
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=<generated_secret>
NEXTAUTH_URL=http://localhost:3000
```

Generate NEXTAUTH_SECRET:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Run Development Server

```powershell
npm run dev
```

Open http://localhost:3000

## Usage

### Searching & Filtering
1. Type in search box to find Pokémon by name (searches entire database)
2. Select type from dropdown to filter by type
3. Click "Clear Filters" to reset all selections

### Favorites
1. Click star (☆/★) on card to favorite/unfavorite
2. Check "Favorites" checkbox to view only favorites
3. Favorites persist after page refresh

### Detail View
1. Click on any Pokémon card to open modal
2. View stats, abilities, height, weight
3. Click X to close

### Authentication
1. Click "Sign In" in header
2. Choose GitHub or Google, or continue as guest
3. Favorites can be tied to your account

## Build & Deployment

### Build for Production

```powershell
npm run build
npm run start
```

### Deploy to Vercel

```powershell
npm i -g vercel
vercel
```

Set environment variables on Vercel dashboard.

### Deploy to Netlify

Requires `nextjs-netlify-plugin`. See [Netlify Next.js docs](https://docs.netlify.com/integrations/frameworks/next-js/).

## Project Structure

```
pokedex-lite/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   # NextAuth API
│   ├── auth/signin/page.tsx              # Sign-in page
│   ├── page.tsx                          # Main page
│   ├── layout.tsx                        # Root layout
│   └── globals.css                       # Global styles & animations
├── components/
│   ├── PokemonCard.tsx
│   ├── PokemonModal.tsx
│   └── UserHeader.tsx
├── context/
│   └── FavoritesContext.tsx
├── hooks/
│   └── usePokemons.ts
├── lib/
│   ├── pokeapi.ts
│   └── auth.ts
└── types/
    └── Pokemon.ts
```

## Scripts

```powershell
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linting
```

## Troubleshooting

**Empty src error**: Fixed — Pokémon without images show placeholder
**OAuth not working**: Check NEXTAUTH_SECRET and redirect URIs
**Favorites not persisting**: Check localStorage is enabled in browser

## Credits

- **PokéAPI**: https://pokeapi.co/
- **Next.js**: https://nextjs.org/
- **NextAuth.js**: https://next-auth.js.org/
- **Tailwind CSS**: https://tailwindcss.com/
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
