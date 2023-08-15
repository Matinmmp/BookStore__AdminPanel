import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";


interface IProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: IProps) => {
    const accessToken = Cookies.get("accessToken")
    const location = useLocation().pathname;


    return accessToken ? children : <Navigate to={'/admin/login'} state={{ from: location }} replace />
}

export default PrivateRoute;