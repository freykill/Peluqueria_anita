import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token } = useAuth(); // Asumiendo que `useAuth` expone `token`
    const location = useLocation();

    if (!token) {
        // Redirige al login, manteniendo la ubicación a la que intentaban acceder para un posible redireccionamiento posterior
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
