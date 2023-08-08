import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from '../pages/Login/index';
import Home from '../pages/Home/index';

const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                }
            ]
        },
        {
            path: '/login',
            element: <Login />
        }
    ]
)


export default routes;