import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './layout/Layout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Login from './features/auth/page/Login.jsx';
import SportGames from './features/speceific_sport_games/page/SportGames.jsx';
import PublicGames from './features/public_games/page/PersonalGames.jsx';
import GameLobby from './features/game_lobby/page/GameLobby.jsx';
import PrivateChats from './features/friends_chat/pages/PrivateChats.jsx';
import HostGame from './features/host_game/pages/HostGame.jsx';
import ProtectedRoute from './layout/protected-route/ProtectedRoute.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import PlayerProfile from './features/profile/pages/PlayerProfile.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import EditProfilePage from './features/edit_profile/page/EditProfile.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx';
import LandingPage from './features/landing_page/LandingPage.jsx';
import Dashboard from './features/home/pages/Dashboard.jsx';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import EmailVerification from './features/auth/components/EmailVerification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      { 
        path: ':sportName', 
        element: <SportGames />,
        errorElement: <ErrorBoundary /> 
      },
      { 
        path: 'personal-games', 
        element: (
          <ProtectedRoute>
            <PublicGames />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path: 'game-chat/:gameId',
        element: (
          <ProtectedRoute>
            <GameLobby />
          </ProtectedRoute>
        ),
        errorElement:<ErrorBoundary/>
      },
      {
        path:'edit-profile/:playerId',
        element:(
          <ProtectedRoute>
            <EditProfilePage/>
          </ProtectedRoute>
        )
      },
      {
        path: 'friends-chat/:friendshipId?', 
        element: (
          <ProtectedRoute>
            <PrivateChats />
          </ProtectedRoute>
        ),
      },
      {
        path: 'friends-chat',
        element: (
          <ProtectedRoute>
            <PrivateChats />
          </ProtectedRoute>
        ),
      },
      {
        path: 'host-game',
        element: (
          <APIProvider 
            apiKey="AIzaSyDerTqNp_r_xIyaY1eQfxRB1FFC8vv7b1k"
            libraries={['places']}
          >
            <ProtectedRoute>
              <HostGame />
            </ProtectedRoute>
          </APIProvider>
        ),
      },
      {
        path:'profile/:playerId',
        element:<PlayerProfile/>,
        errorElement:<ErrorBoundary/>
      }
    ],
  },
  {
    path: '/verify-email/:token',
    element: <EmailVerification />,
    errorElement: <ErrorBoundary />
  },
]);

// Render root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider token={localStorage.getItem('token')||''}>
          <RouterProvider router={router} />
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);