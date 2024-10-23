import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './layout/Layout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Login from './features/auth/page/Login.jsx';
import SportGames from './features/speceific_sport_games/page/SportGames.jsx';
import PublicGames from './features/public_games/page/PublicGames.jsx';
import GameLobby from './features/game_lobby/page/GameLobby.jsx';
import PrivateChats from './features/friends_chat/pages/PrivateChats.jsx';
import HostGame from './features/host_game/pages/HostGame.jsx';
import LandingPage from './features/home/pages/LandingPage.jsx';
import ProtectedRoute from './layout/protected-route/ProtectedRoute.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry:false
    }
  }
})

//loader to be added , it allows to run functions before the page finish rendering and you can access the loaded data with useLoaderData hook 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ':sportName',
        element: <SportGames />,
      },
      {
        path: 'public-games',
        element: <PublicGames />,
      },
      {
        path: 'game-chat',
        element: (
          <ProtectedRoute>
            <GameLobby />
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
        element:  (
          <ProtectedRoute>
            <HostGame />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </RouterProvider>
  </QueryClientProvider>
</StrictMode>
)
