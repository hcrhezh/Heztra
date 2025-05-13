#!/bin/bash

echo "Building the static site for GitHub Pages..."
npx vite build --config vite.config.static.ts

echo "Creating a .nojekyll file to disable Jekyll processing..."
touch dist/.nojekyll

echo "Build complete! The contents of the 'dist' directory can now be deployed to GitHub Pages."