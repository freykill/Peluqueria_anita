import { useEffect, useState } from 'react';
import ClientesList from '../components/ClientList';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { ClientModal } from '../components/ClientModal';
import AddIcon from '@mui/icons-material/Add';

interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

export const ClientesPage = () => {
    const handleAdd = () => {};
    const [client, setclient] = useState<Cliente[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbar1, setOpenSnackbar1] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [start, setstart] = useState(false);
    const [error, setError] = useState('');
    const [creEdit, setcreEdit] = useState(true);
    const [value, setvalue] = useState();

    const handleOpen = (estado: boolean) => {
        setcreEdit(estado);
        // setvalue(undefined);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenSnackbar1(false); // Cierra el Snackbar
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:3000/clientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('🚀 ~ handleDelete ~ data:', data);
            if (!response.ok) {
                throw new Error(`${data.error}`);
            }

            console.log(id);

            setErrorMessage('ElIMINACION EXITOSAA');
            setclient((client: any) => client.filter((value: any) => value.id !== id));
            setOpenSnackbar1(true);
        } catch (error: any) {
            setErrorMessage('ERROR AL ELIMINAR EL REGISTRO'); // Configura el mensaje de error
            setOpenSnackbar(true);
        }
    };

    const obtenerClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.error}`);
            }

            setErrorMessage('SE CARGARON LOS DATOS CORRECTAMENTE');
            setOpenSnackbar1(true);
            setclient(data);
        } catch (error: any) {
            setErrorMessage(`${error}`); // Configura el mensaje de error
            setOpenSnackbar(true);
        }
    };

    const handleSubmit = async (newCliente: Cliente) => {
        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCliente),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.error}`);
            }

            console.log('Cliente agregado:', data);
            setclient((client) => [...client, data]);
            handleClose(); // Cierra el modal después de agregar el cliente
        } catch (error: any) {
            setstart(true);
            setError(`${error}`);
        }
    };

    const handleEdit = async (cliente: any) => {
        handleOpen(false);
        setvalue(cliente);
    };
    const handleEditar = async (cliente: any) => {
        console.log('🚀 ~ handleEditar ~ cliente:', cliente);
        try {
            const response = await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`${data.error}`);
            }
            console.log('Cliente agregado:', data);
            setclient((clients) => clients.map((c) => (c.id === cliente.id ? { ...c, ...data } : c)));
            handleClose(); // Cierra el modal después de agregar el cliente
            setstart(false);
        } catch (error: any) {
            setstart(true);
            setError(`${error}`);
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    return (
        <div style={{ paddingTop: 100 }}>
            <ClientesList handleEdit={handleEdit} handleDelete={handleDelete} handleAdd={handleAdd} clientes={client}></ClientesList>

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ margin: 10 }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen(true)} style={{ marginBottom: '10px' }}>
                    Agregar Clientes
                </Button>
            </Box>

            <ClientModal handleClose={handleClose} handleSubmit={handleSubmit} open={open} start={start} error={error} creEdit={creEdit} value={value} handleEditar={handleEditar} />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Duración del Snackbar
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posición del Snackbar
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage} {/* Mensaje de error */}
                </Alert>
            </Snackbar>

            <Snackbar
                open={openSnackbar1}
                autoHideDuration={3000} // Duración del Snackbar
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posición del Snackbar
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {errorMessage} {/* Mensaje de error */}
                </Alert>
            </Snackbar>
        </div>
    );
};
