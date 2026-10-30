# MusicFy — Full-stack music library

A React + Vite + Tailwind CSS frontend connected to the Express/MongoDB backend in `../backend`.

## Features

- Responsive dark music discovery interface
- User registration and login using the backend's JWT cookie flow
- Protected music library and album browsing
- Persistent bottom audio player with seek, volume, shuffle and repeat controls
- Admin studio for uploading music to ImageKit and creating albums from existing track IDs
- Hash-based page navigation; no extra router dependency

## Run locally

### 1. Start the backend

In a terminal:

```bash
cd backend
npm install
# Configure backend/.env (see the backend section below)
npm start
```

The backend listens on `http://localhost:3000`.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

The Vite dev server proxies `/api/*` requests to `http://localhost:3000`. Keep the frontend and backend on the same local host name (for example, both use `localhost`) so the authentication cookie is sent consistently.

## Backend environment

Create `backend/.env` locally; do not commit it. The backend source uses:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
IMAGEKIT_P_KEY=your_imagekit_private_key
```

Use the exact MongoDB variable expected by `backend/src/db/db.js`; the database connector may use a different name. Never put private keys in the frontend `.env`.

## Authentication notes

- The backend has no `GET /me` or session endpoint. On refresh, the frontend validates the stored display identity by requesting the protected `GET /api/admin/` music route. If that request fails, the frontend clears the cached identity.
- Registration always sends `role: "user"`. Create or promote an admin account through a trusted database/admin process; this frontend does not expose public admin registration.
- The server enforces admin access for uploads and album creation. The frontend's role-based navigation is only a UI convenience, not a security boundary.

## API routes used

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login with username or email and password |
| POST | `/api/auth/logout` | Clear login cookie |
| GET | `/api/admin/` | Read authenticated music library |
| GET | `/api/admin/albums` | List albums |
| GET | `/api/admin/albums/:id` | Read one album with its tracks |
| POST | `/api/admin/upload` | Admin-only upload; multipart fields `title` and `music` |
| POST | `/api/admin/album` | Admin-only album creation; JSON `{ "title": "...", "musics": ["musicId"] }` |

## Backend limitations reflected in the UI

The supplied API does not currently provide artist, playlist, favorites, user-management, song-edit, or song-delete endpoints. Those features are intentionally not represented as working controls in this frontend.
