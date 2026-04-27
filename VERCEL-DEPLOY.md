# Vercel Deploy Notes

This frontend is ready to deploy on Vercel.

## Recommended project settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `frontend` only if you import the parent repo that also contains `backend`

## Environment variable

Set this if your API is hosted separately:

```bash
VITE_API_BASE_URL=https://your-backend-domain.example.com
```

If the frontend and API are served from the same domain, production now falls back to same-origin automatically.

## Routing

`vercel.json` is included so React Router routes like `/about`, `/donate`, and `/contact` work on refresh and direct visits.
