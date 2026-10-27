CRM Backend
Node.js, Express, and MongoDB API for the CRM application.

Requirements
- Node.js and npm
- MongoDB connection string

Setup
1. Open a terminal in the server folder.
2. Install dependencies:npm install
3. Create a .env file:PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
4. Start the server using the script in package.json (commonly npm run dev or npm start).

Features
- User registration and login
- Password hashing
- JWT stored in an HTTP-only cookie
- Role-based access control
- View and update your own profile
- Admin-only user listing, editing, and deletion

API Routes
Base URL: http://localhost:3000/api

Authentication
- POST /auth/register — Register
- POST /auth/login — Log in
- POST /auth/logout — Log out

Users
- GET /users/me — View your profile (login required)
- PUT /users/me — Update your profile (login required; send name, email, or both)
- GET /users — List users (admin only)
- PUT /users/:id — Update a user (admin only)
- DELETE /users/:id — Delete a user (admin only)

Notes
- Ensure the frontend URL matches the backend CORS configuration.
- Never commit .env or share database credentials.
- Public registration must not let users choose their own admin role.