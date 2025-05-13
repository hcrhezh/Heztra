# Polifilo - Portfolio & App Store

A modern portfolio website with a beautiful app store section, featuring UI/UX animations and a video background.

## Features

- Responsive layout with video background in the hero section
- Portfolio showcase with animation effects
- App store section with app cards and category filters
- Detailed app pages with features and screenshots
- About, features, and contact sections
- SEO optimization with meta tags

## Tech Stack

- React + TypeScript
- Vite for frontend build
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI components
- React Query for data fetching

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at http://localhost:5000

## GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

### Automatic Deployment (GitHub Actions)

1. Fork or push this repository to your GitHub account
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select 'GitHub Actions' as the source
3. The workflow will automatically deploy the site whenever you push to the main branch

### Manual Deployment

If you want to build the static site manually:

1. Run the build script:
   ```
   bash build-github.sh
   ```
2. The static site will be generated in the `dist` directory
3. You can deploy this directory to any static hosting service

## Customization

- Edit the portfolio items and apps data in `client/public/data/`
- Modify styling in `client/src/index.css`
- Update content in the respective component files

## Credits

- Video backgrounds from Mixkit
- Stock images from Unsplash and Pixabay