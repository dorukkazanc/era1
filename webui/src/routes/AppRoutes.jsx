import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

