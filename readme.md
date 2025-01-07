# TeamUp - Sports Match Finder

TeamUp is a web application designed to connect sports enthusiasts, helping them find and join local sports matches. The platform facilitates game organization, player connections, and real-time communication.

## Features

- **User Authentication**
  - JWT-based secure authentication
  - Email verification
  - Profile management

- **Game Management**
  - Create and join sports matches
  - Real-time game updates
  - Match history tracking
  - Skill level matching

- **Real-time Communication**
  - Game-specific chat rooms
  - Private messaging
  - Friend system
  - Real-time notifications

## Tech Stack

### Frontend
- React + Vite
- Material-UI
- Socket.IO Client
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB
- Socket.IO
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository**

bash\
git clone https://github.com/HatemKhabir/TeamUp\
cd TeamUp

2. **Frontend Setup**

cd frontend\
npm install -g pnpm\
pnpm install

3. **Backend Setup**

cd backend\
npm install 

4. **Environment Variables**

Create a .env file in the backend directory with the following variables:

These are the variables that I used in my project, you can change them to your own values or for privacy reasons i will be changing them after the defense.

PORT=8080\
ATLAS_URI= "mongodb+srv://hatemkhabircse:Hatem123@cluster0.gftax5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"\
JWT_SECRET="teamup"\
EMAIL_USERNAME=khabirhatem38@gmail.com\
EMAIL_APP_PASSWORD=kgecxpqeiiduehkz\
FRONTEND_URL=http://localhost:5173

5. **Run the application**

cd frontend
pnpm run dev

cd backend
npm start


The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/verify-email` - Email verification

### Game Endpoints
- GET `/api/events/get-events` - Fetch available games
- POST `/api/events/create-event` - Create new game
- POST `/api/events/join-event` - Join existing game

### Chat Endpoints
- GET `/api/chat/messages/:chatId` - Fetch chat messages
- POST `/api/chat/send-message` - Send new message

## Socket Events

- `joinGame` - Join game lobby
- `gameUpdate` - Real-time game updates
- `sendMessage` - Chat messaging
- `newFriendRequest` - Friend request notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Hatem Khabir - khabirhatem38@gmail.com
Project Link: https://github.com/HatemKhabir/TeamUp
