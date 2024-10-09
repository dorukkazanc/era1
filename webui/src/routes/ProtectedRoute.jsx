
// session'da loggedInUser yoksa login sayfasına yönlendirmek için protectedRoute oluşturdum.
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
    const {loggedInUser} = useAuth();

    if (!loggedInUser) {
        console.log("loggedInUser", loggedInUser)

        return <Navigate to="/login" />;
    }
    console.log("loggedInUser", loggedInUser)


    return children;
}

export default ProtectedRoute;