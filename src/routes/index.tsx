import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Home, PermissionList } from "../pages";

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
                        label: 'Home',
                    },
                    {
                        to: '/permission',
                        icon: 'rule',
                        label: 'Permission',
                    }
                ]
            }
        ]);
    });

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/permission" element={<PermissionList />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
