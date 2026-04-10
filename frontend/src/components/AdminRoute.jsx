
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";


function AdminRoute({ children }) {
    const { user } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);
    const navigate = useNavigate();

    if (!user) {
        showFlash("You need to login first", "error");
        return navigate("/login");
    }

    if (user.role !== "admin") {
        showFlash("You can't access this", "error");
        return navigate("/");
    }

    return children;

}

export default AdminRoute;