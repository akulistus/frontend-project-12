import Home from '../pages/home-page/Home';
import Login from '../pages/login-page/Login';
import ChatPage from '../pages/chat-page/ChatPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import SignUpPage from '../pages/signup-page/SignUpPage';

import { createBrowserRouter, redirect } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element:<ChatPage />,
        loader: async () => {
          const token = window.localStorage.getItem('token');
          if (!token) {
            return redirect('login'); 
          };
          return null;
        }
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUpPage />
      }
    ],
  },
]);

export default router;