import Home from '../pages/home-page/Home';
import Login from '../pages/login-page/Login';
import ChatPage from '../pages/chat-page/ChatPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import SignUpPage from '../pages/signup-page/SignUpPage';

import { createBrowserRouter, redirect } from 'react-router-dom';
import store from '../services/index';
import { selectToken } from '../slices/authSlice';

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
          const token = selectToken(store.getState());
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