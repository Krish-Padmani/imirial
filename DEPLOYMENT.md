# IMIRIAL - Deployment Guide

## Overview
This project consists of:
- **Frontend**: React + Vite (Deployed on Vercel)
- **Backend**: Node.js + Express + MongoDB (Deployed on Render)
- **Database**: MongoDB Atlas (Cloud)

## Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free)

## Step 1: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with email: `padmanirkrish69@gmail.com`
3. Create a free cluster
4. Create database user:
   - Username: `admin`
   - Password: `Krish@1201`
5. Add IP whitelist: `0.0.0.0/0`
6. Get connection string (looks like):
   ```
   mongodb+srv://admin:Krish@1201@cluster0.xxxxx.mongodb.net/imirial?retryWrites=true&w=majority
   ```

## Step 2: Deploy Backend on Render

1. Go to https://render.com
2. Sign up with GitHub
3. Create new Web Service
4. Connect GitHub repo: `Krish-Padmani/imirial`
5. Configure:
   - **Name**: `imirial-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://admin:Krish@1201@cluster0.xxxxx.mongodb.net/imirial?retryWrites=true&w=majority
   JWT_SECRET=imirial_super_secret_key_change_in_production
   ADMIN_EMAIL=admin@imirial.com
   ADMIN_PASSWORD=Imirial@2024
   PORT=5000
   ```
7. Deploy

**Backend URL**: `https://imirial-backend.onrender.com`

## Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import project: `Krish-Padmani/imirial`
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://imirial-backend.onrender.com/api
   ```
6. Deploy

**Frontend URL**: `https://imirial.vercel.app`

## Step 4: Update Backend CORS

In `backend/server.js`, update CORS to allow Vercel domain:

```javascript
app.use(cors({
  origin: ['https://imirial.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## Admin Credentials

- **Email**: `admin@imirial.com`
- **Password**: `Imirial@2024`

Access admin panel at: `https://imirial.vercel.app/admin`

## WhatsApp Number

Updated to: `9664720452`

## Local Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Troubleshooting

- **API not connecting**: Check CORS settings and environment variables
- **MongoDB connection error**: Verify connection string and IP whitelist
- **Build fails**: Clear cache and rebuild
