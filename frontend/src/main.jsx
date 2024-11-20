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
import LandingPage from './features/home/pages/LandingPage.jsx';
import ProtectedRoute from './layout/protected-route/ProtectedRoute.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import PlayerProfile from './features/profile/pages/PlayerProfile.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import EditProfilePage from './features/edit_profile/page/EditProfile.jsx';

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
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage />,
        errorElement:<ErrorBoundary/> },
      { path: ':sportName', element: <SportGames />,
        errorElement:<ErrorBoundary/> },
      { path: 'personal-games', element: (<ProtectedRoute>
      <PublicGames />
      </ProtectedRoute>),
        errorElement:<ErrorBoundary/>},
      {
        path: 'game-chat',
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
          <ProtectedRoute>
            <HostGame />
          </ProtectedRoute>
        ),
      },
      {
        path:'profile/:playerId',
        element:<PlayerProfile/>,
        errorElement:<ErrorBoundary/>
      }
    ],
  },
  { path: '/auth', element: <Login /> },
]);

// Render root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);