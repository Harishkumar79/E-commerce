import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation();

    // For not authorized users
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to='/auth/login' replace />;
    }

    // For already authorized users
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        console.log(user?.role);
        if (user?.role === "admin") {
            return <Navigate to='/admin/dashboard' replace />;
        } else {
            return <Navigate to='/shop/home' replace />;
        }
    }

    // For authenticated users who are not admin trying to access admin pages
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
        return <Navigate to='/unauth-page' replace />;
    }

    // For authenticated admin users trying to access shopping pages
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')) {
        return <Navigate to='/admin/dashboard' replace />;
    }

    // Default: Render children
    return <>{children}</>;
}

export default CheckAuth;
