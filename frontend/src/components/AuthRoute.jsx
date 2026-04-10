import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";

function AuthRoute({ children }) {
    const { user, loading, isLoggedOut } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user && !isLoggedOut) {
            showFlash("You need to login first", "error");
        }
    }, [loading, user]);

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to={isLoggedOut ? "/" : "/login"} replace />;
    }


    return children;
}

export default AuthRoute;