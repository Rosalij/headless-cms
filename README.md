# Skintrack Åre

This is a headless WordPress website for Skintrack Åre, a guided ski touring company based in Åre. Built with Next.js, TypeScript, Tailwind CSS v4, and WordPress as a headless CMS via Wordpress API and WPGraphQL plugin.

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Styling:** Tailwind CSS v4
- **CMS:** WordPress (Headless)
- **API:** WPGraphQL (GraphQL)

## Features

- Headless WordPress architecture with GraphQL data fetching
- Modular and reusable component structure
- Dynamic pages generated from WordPress
- Responsive design for mobile and desktop
- Server-side rendering with Next.js

## Project Structure

src/
├── app/
│   ├── page.tsx              # Home page
│   ├── [slug]/page.tsx       # Dynamic WordPress pages
│   └── globals.css           # Global styles and Tailwind theme
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Tours.tsx
│       ├── Team.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── FaqList.tsx
│       ├── CTA.tsx
│       └── FillerImage.tsx
├── lib/
│   └── wordpress/
│       ├── client.ts         # GraphQL fetch client
│       └── queries.ts        # GraphQL queries
└── types/
└── types.ts       

## Getting Started

### Prerequisites

- Node.js 18+
- A WordPress installation with the following plugins:
  - WPGraphQL
  - Advanced Custom Fields (ACF)
  - WP Webhooks (for deploying on Netlify)
  - WPGraphQL for ACF

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rosalij/headless-cms.git
cd headless-cms
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory, with your Wordpress WPGraphQL endpoint

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## WordPress Setup

The following Custom Post Types are required in WordPress:

- **Tours** — with fields: `tourName`, `tourDescription`, `price`
- **Team Members** — with fields: `name`, `role`, `description`, `portraitImage`
- **Testimonials** — with fields: `quote`, `quoteAuthor`
- **FAQs** — with fields: `question`, `answer`
- **CTAs** — with fields: `ctaText`, `buttonText`, `buttonLink`, `ctaBackgroundImage`
- **Global Settings** — with fields: `headerTitle`, `logotype`, `heroHeadingText`, `heroImage`, `fillerImage`, `footercontact`, `homepageLink`

## Deployment

The project is deployed on Netlify on https://skintrackare.netlify.app/. To deploy your own instance:

1. Push the repository to GitHub
2. Connect the repository to Netlify
3. Set the environment variable `WORDPRESS_URL` in Netlify's environment settings
4. Set the build command to `next build` and publish directory to `.next`

