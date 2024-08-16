import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<>Home page</>} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
