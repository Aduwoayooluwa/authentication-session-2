import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { SecondLogin } from "./auth/login_";
import Login from "./auth/login";
import Dashboard from "./dashboard";
import ProtectedRoute from "./auth/protected-route";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/second-login" element={<SecondLogin />} />
            </Routes>
        </BrowserRouter>
    );
}