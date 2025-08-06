# Dashboard API & Socket Error Debug Guide

## Common Issues and Solutions

### 1. API Endpoint Issues

#### Check Server Status
```bash
# Test backend server
curl http://localhost:5000/api/events
```

#### Check CORS Configuration
```bash
# Verify CORS is set correctly
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:5000/api/events
```

### 2. Socket Connection Issues

#### Test Socket Connection
```javascript
// Test socket connection in browser console
const socket = io('http://localhost:5000');
socket.on('connect', () => console.log('Connected'));
socket.on('connect_error', (error) => console.log('Connection error:', error));
```

### 3. Environment Variables Check

#### Backend Environment Check
```bash
# Check if .env exists and has correct values
cat backend/.env
```

#### Frontend Environment Check
```bash
# Check if .env exists and has correct values
cat frontend/.env
```

### 4. Database Connection Test
```bash
# Test MongoDB connection
mongo mongodb://localhost:27017/event_management --eval "db.stats()"
```

### 5. Port Availability Check
```bash
# Check if ports are available
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

## Quick Fix Steps

### 1. Verify Backend is Running
```bash
cd backend
npm start
# Should show "Server is running on port: 5000"
```

### 2. Test API Endpoints
```bash
# Test events endpoint
curl http://localhost:5000/api/events

# Test with auth token
curl -H "x-auth-token: YOUR_TOKEN" http://localhost:5000/api/events
```

### 3. Test Socket Connection
```bash
# Test socket server
curl -H "Origin: http://localhost:5173" http://localhost:5000/socket.io/
```

### 4. Check Error Logs
```bash
# Check backend logs
tail -f backend/logs/error.log

# Check frontend console
# Open browser dev tools (F12) and check console
```

## Common Error Solutions

### Error: "Network Error" or "CORS Error"
1. **Check CORS origin in backend/.env**
   ```
   CORS=http://localhost:5173
   ```

2. **Restart backend server after changes**

### Error: "Socket connection failed"
1. **Check socket.io server configuration**
2. **Verify port 5000 is not blocked**
3. **Check firewall settings**

### Error: "401 Unauthorized"
1. **Check auth token in localStorage**
2. **Verify token is valid and not expired**
3. **Check user role permissions**

## Testing Checklist

### Backend Tests
- [ ] Server starts on port 5000
- [ ] MongoDB connection successful
- [ ] CORS headers present
- [ ] Events endpoint returns data
- [ ] Socket.io connection established

### Frontend Tests
- [ ] API calls work correctly
- [ ] Socket connection established
- [ ] Registration counts update in real-time
- [ ] Error handling works properly
