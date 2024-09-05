import Home from "../components/home-page/Home";
import Login from "../components/login-page/Login";
import ChatPage from "../components/chat-page/ChatPage";
import ErrorPage from "../components/error-page/ErrorPage";

import { createBrowserRouter, redirect } from "react-router-dom";
import store from '../services/index';
import { selectToken } from "../slices/authSlice";

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
    ],
  },
]);

export default router;