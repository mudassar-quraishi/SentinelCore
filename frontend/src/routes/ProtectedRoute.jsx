import { Navigate } from "react-router-dom";
import { getCurrentRole } from "../services/auth";

function ProtectedRoute({ children, allowedRoles }) {

    const token = sessionStorage.getItem("token");
    const role = getCurrentRole();

    if (!token) return <Navigate to="/" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;

}

export default ProtectedRoute;
