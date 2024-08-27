import Home from "../components/home-page/Home";
import Login from "../components/login-page/Login";
import ErrorPage from "../components/error-page/ErrorPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    }
]);

export default router;