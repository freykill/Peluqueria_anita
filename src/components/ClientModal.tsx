import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const ClientModal = ({ handleClose, handleSubmit, open, start, error, creEdit, value = {}, handleEditar }: any) => {
    const [newCliente, setNewCliente] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion: '',
    });
    //     {
    //         "nombre": "Eric",
    //         "apellido": "diaz",
    //         "telefono": "0963123381",
    //         "email": "fabri@hotmail.com",
    //         "direccion": "victoria"
    // }

    useEffect(() => {
        if (creEdit) {
            console.log('se esta ejecuitael useefeec');
            // Si estás creando un nuevo cliente, resetea los campos
            setNewCliente({
                nombre: '',
                apellido: '',
                telefono: '',
                email: '',
                direccion: '',
            });
        } else if (open) {
            // Si estás editando un cliente, carga los valores cuando el modal se abra
            setNewCliente(value);
        }
    }, [open]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewCliente((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor="background.paper"
                boxShadow={24}
                p={4}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: '#333',
                    color: '#fff',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {creEdit ? 'CREANDO CLIENTE' : 'EDITANDO CLIENTE'}
                </Typography>

                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="nombre"
                    value={newCliente.nombre}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="apellido"
                    value={newCliente.apellido}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                <TextField
                    label="telefono"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="telefono"
                    value={newCliente.telefono}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                <TextField
                    label="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={newCliente.email}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                <TextField
                    label="direccion"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="direccion"
                    value={newCliente.direccion}
                    onChange={handleInputChange}
                    style={{ marginBottom: '20px' }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />
                {start && (
                    <Alert severity="error" sx={{ width: '91%', mt: 1 }}>
                        {error}
                    </Alert>
                )}

                <Button variant="contained" color="primary" onClick={creEdit ? () => handleSubmit(newCliente) : () => handleEditar(newCliente)}>
                    Guardar
                </Button>
            </Box>
        </Modal>
    );
};
