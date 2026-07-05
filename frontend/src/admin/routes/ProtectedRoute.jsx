import { Navigate, Outlet } from "react-router-dom";
import { getAdminToken } from "../services/authService";

function ProtectedRoute() {
const token = getAdminToken();

if (!token) {
return <Navigate to="/admin/login" replace />;
}

return <Outlet />;
}

export default ProtectedRoute;
