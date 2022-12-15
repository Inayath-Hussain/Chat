import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem('Allow')) {
        return children
    }
    return <Navigate to='/login' />
}

export default ProtectedRoute;