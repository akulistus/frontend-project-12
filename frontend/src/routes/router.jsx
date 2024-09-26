import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home-page/homePage';
import LoginPage from '../pages/login-page/loginPage';
import ChatPage from '../pages/chat-page/chatPage';
import ErrorPage from '../pages/error-page/errorPage';
import SignUpPage from '../pages/signup-page/signUpPage';
import routes from '../helpers/routes';
import store from '../services/index';

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
          const { user: { getToken } } = store.getState();
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
