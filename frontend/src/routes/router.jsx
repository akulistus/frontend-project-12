import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import LoginPage from '../pages/login-page/LoginPage';
import ChatPage from '../pages/chat-page/ChatPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import SignUpPage from '../pages/signup-page/SignUpPage';
import routes from '../helpers/routes';
import { getToken } from '../slices/userSlice';

const router = createBrowserRouter([
  {
    path: routes.homePagePath(),
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ChatPage />,
        loader: async () => {
          const token = getToken();
          if (!token) {
            return redirect(routes.loginPagePath());
          }
          return null;
        },
      },
      {
        path: routes.loginPagePath(),
        element: <LoginPage />,
      },
      {
        path: routes.signupPagePath(),
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
