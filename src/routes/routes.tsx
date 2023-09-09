import ProtectedRoute from "../components/routes/protectedRoute";
import PrivateRoute from "../components/routes/privateRoutes";
import { createBrowserRouter } from "react-router-dom";
import Products from '../pages/Products/index';
import NotFound from "../pages/NotFound/index";
import Category from "../pages/Category/index";
import MainLayout from "../Layout/MainLayout";
import Login from '../pages/Login/index';
import Order from '../pages/Order/index';
import Price from '../pages/Price/index';


const routes = createBrowserRouter(
    [
        {
            path: '/',
            errorElement: <NotFound />,
            element: <PrivateRoute><MainLayout /></PrivateRoute>,
            children: [
                {
                    path: '/admin/',
                    element: <div>hi</div>
                },
                {
                    path: '/admin/products',
                    element: <Products />,
                },
                {
                    path: '/admin/price',
                    element: <Price />
                },
                {
                    path: '/admin/orders',
                    element: <Order />
                },
                {
                    path: '/admin/categories',
                    element: <Category />
                },
            ]
        },
        {
            path: '/admin/login',
            element: <ProtectedRoute><Login /></ProtectedRoute>
        },

    ]
)








export default routes;