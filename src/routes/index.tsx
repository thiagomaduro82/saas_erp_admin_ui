import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
    
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'speed',
                label: 'Dashboard',
                data: [
                    {
                        to: '/home',
                        icon: 'home',
                        label: 'Home'
                    }
                ]
            }
        ]);
    });

    return (
        <Routes>
            <Route path="/home" element={<>Home page</>} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
