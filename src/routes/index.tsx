import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Home, PermissionDetail, PermissionList } from "../pages";

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
                ]
            },
            {
                icon: 'laptop',
                label: 'System',
                data: [
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
            <Route path="/permission/detail/:uuid" element={<PermissionDetail />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
