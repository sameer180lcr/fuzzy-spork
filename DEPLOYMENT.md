# Deployment Guide

## Render Deployment

This project is configured for deployment on Render using the `render.yaml` file.

### Prerequisites
- GitHub repository
- Render account
- MongoDB database (MongoDB Atlas recommended for production)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configure Environment Variables**
   
   **Backend Service (`talent-forge-backend`):**
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render's default)
   
   **Frontend Service (`talent-forge-frontend`):**
   - `VITE_API_URL`: `https://talent-forge-backend.onrender.com/api`
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Services Configuration

#### Backend Service
- **Name**: talent-forge-backend
- **Type**: Web Service (Node.js)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Health Check**: `/health`

#### Frontend Service
- **Name**: talent-forge-frontend
- **Type**: Static Site
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### MongoDB Setup

1. **MongoDB Atlas** (Recommended for production)
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Add your IP to the whitelist (0.0.0.0/0 for Render)
   - Get the connection string
   - Add to Render environment variables

2. **Local Development**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your local MongoDB URI
   
   # Frontend
   cp .env.example .env
   # Edit .env with your local API URL
   ```

### Verification System

The verification system includes:
- Company information collection
- Representative management
- Verification checks
- MongoDB storage in `verificationcompanydetail` collection
- Status tracking (pending, in_review, approved, rejected)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Verification
- `POST /api/verification` - Submit verification
- `GET /api/verification/status/:userId` - Get verification status
- `GET /api/verification` - Get all verifications (admin)
- `PATCH /api/verification/:id/status` - Update verification status (admin)

#### Profile
- `GET /api/profile/:userId` - Get user profile
- `POST /api/profile` - Create/update profile

### Troubleshooting

1. **Build Failures**
   - Check package.json scripts
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection Issues**
   - Verify MongoDB URI is correct
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **CORS Issues**
   - Frontend URL should be whitelisted
   - Check backend CORS configuration

4. **API Connection Issues**
   - Verify `VITE_API_URL` is set correctly
   - Check backend service is running
   - Ensure health check passes

### Post-Deployment

1. **Test All Features**
   - User registration/login
   - Profile management
   - Verification submission
   - Admin functions

2. **Monitor Logs**
   - Check Render service logs
   - Monitor error rates
   - Set up alerts if needed

3. **Security**
   - Use HTTPS (automatic on Render)
   - Set up proper authentication
   - Regularly update dependencies
