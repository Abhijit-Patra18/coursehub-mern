
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";


function AdminRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            showFlash("You need to login first", "error");
        } else if (user.role !== "admin") {
            showFlash("You can't access this", "error");
        }
    }, [loading, user]);


    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default AdminRoute;