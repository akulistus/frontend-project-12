import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import LoginPage from '../pages/login-page/LoginPage';
import ChatPage from '../pages/chat-page/ChatPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import SignUpPage from '../pages/signup-page/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ChatPage />,
        loader: async () => {
          const token = window.localStorage.getItem('token');
          if (!token) {
            return redirect('login');
          }
          return null;
        },
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
