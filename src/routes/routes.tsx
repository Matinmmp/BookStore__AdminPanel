import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from '../pages/Login/index';
import Goods from '../pages/Goods/index';
import Order from '../pages/Order/index';
import Price from '../pages/Price/index';


const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Goods />,
                },
                {
                    path:'/order',
                    element:<Order/>
                },
                {
                    path:'/price',
                    element:<Price/>
                },
            ]
        },
        {
            path: '/login',
            element: <Login />
        }
    ]
)


export default routes;