# Panduan Deployment Publik

## Opsi 1: Vercel + Render

### Frontend (Vercel)
1. Push repository ke GitHub.
2. Buat project di Vercel.
3. Set environment variable:
   - VITE_API_URL=https://<backend-url>/api
4. Deploy.

### Backend (Render)
1. Buat Web Service di Render.
2. Hubungkan repository GitHub.
3. Set build command:
   - npm install
4. Set start command:
   - npm start
5. Set environment variable:
   - JWT_SECRET=change-this-secret
   - CORS_ORIGIN=https://<frontend-url>
6. Deploy.

## Opsi 2: Netlify + Railway
- Frontend di Netlify.
- Backend di Railway.
- Gunakan environment variable yang sesuai.

## Catatan Penting
- Aplikasi saat ini masih memakai data mock di backend, jadi data akan reset saat restart service kecuali dipasang database.
- Untuk URL publik yang stabil, disarankan menambahkan database nyata seperti MongoDB atau PostgreSQL.
