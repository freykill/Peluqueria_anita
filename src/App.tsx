import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

import { PrivateRoute } from './services/PrivateRoute';
import { PublicRoute } from './services/PublicRoute';
import { PeluqueriaRouter } from './router/PeluqueriaRouter';

export const App = () => {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <PeluqueriaRouter />
                    </PrivateRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            {/* <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/citas" element={<CitasPage />} />
            <Route path="/atenciones" element={<AtencionesPage />} /> */}
        </Routes>
    );
};
