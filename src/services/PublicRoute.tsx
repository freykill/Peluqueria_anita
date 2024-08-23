import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
    const state = (location.state as { from?: Location }) || {};

    // Si hay un token, redirige a la página de inicio o dashboard, o al último lugar intentado visitar
    if (token) {
        const redirectPath = state.from?.pathname || '/';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};
