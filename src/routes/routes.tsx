import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from '../pages/Login/index';
import Goods from '../pages/Goods/index';
import Order from '../pages/Order/index';
import Price from '../pages/Price/index';
import NotFound from "../pages/NotFound/index";


const routes = createBrowserRouter(
    [
        {
            path: '/',
            errorElement: <NotFound />,
            element: <MainLayout />,
            children: [
                {
                    path: '/admin/',
                    element: <Order />,
                },
                {
                    path: '/admin/products',
                    element: <Goods />
                },
                {
                    path: '/admin/price',
                    element: <Price />
                },
            ]
        },
        {
            path: '/admin/login',
            element: <Login />
        },

    ]
)








export default routes;