# Dashboard Page Setup Guide

## Environment Configuration

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create the environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the .env file with your actual values:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create the environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the .env file with your actual values:
   ```
   DATABASE_URL=mongodb://localhost:27017/event_management
   PORT=5000
   CORS=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key_here
   ```

## Testing the Dashboard

1. **Start the backend server**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the frontend server**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the dashboard**:
   - Open http://localhost:5173 in your browser
   - Login or register a new account
   - Navigate to the dashboard to test functionality

## API Endpoints Used
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create new event (organizers only)
- `POST /api/events/:id/register` - Register for an event (users only)

## Socket Events
- `registrations` - Real-time registration count updates
