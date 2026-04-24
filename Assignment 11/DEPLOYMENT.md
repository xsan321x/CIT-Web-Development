# Vercel Deployment Guide

## What is already configured

- Frontend build command: `npm run build`
- Vercel serverless API routes:
  - `GET/POST /api/products`
  - `GET/PUT/DELETE /api/products/:id`
- SPA routing fallback in `vercel.json`
- Frontend API base URL defaults to `/api/products`
- Local dev proxy (`vite.config.js`) forwards `/api/*` to `http://localhost:3000/*`

## Deploy steps (Vercel Dashboard)

1. Push `Assignment 11` to GitHub.
2. In Vercel, click **Add New Project** and import repo.
3. Set **Root Directory** to `Assignment 11`.
4. Framework preset: **Vite**.
5. Build command: `npm run build` (auto-detected).
6. Output directory: `dist` (auto-detected).
7. Click **Deploy**.

## Optional env var

- `VITE_API_BASE_URL`  
  Only needed if you want frontend to call an external API instead of Vercel `/api`.

## Important note

- Products are stored in memory in API functions, so data can reset between cold starts/redeploys.
- For permanent data, connect a real database (MongoDB/Postgres).
