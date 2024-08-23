import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Navbar } from '../components/NavBar';
import { ClientesPage } from '../pages/ClientesPage';

export const PeluqueriaRouter = () => {
    return (
        <>
            <Navbar></Navbar>

            <Routes>
                <Route path="/asd" element={<HomePage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                {/* <Route path="/clientes" element={<ListarClientes />} />
                    <Route path="/clientes/create" element={<CrearClientes />} />
                    <Route path="/clientes/edit/:id" element={<EditarCliente />} /> */}
            </Routes>
        </>
    );
};
