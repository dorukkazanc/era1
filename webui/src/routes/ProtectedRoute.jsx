
// session'da loggedInUser yoksa login sayfasına yönlendirmek için protectedRoute oluşturdum.
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
    const {loggedInUser} = useAuth();

    return loggedInUser ? children : <Navigate to="/login" />
}

export default ProtectedRoute;