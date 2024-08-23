import React, { useState } from 'react';
import {
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    TablePagination,
    TextField,
    Modal,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ClientModal } from './ClientModal';

const ClientesList = ({ clientes = [], handleEdit, handleDelete }: any) => {
    console.log('🚀 ~ ClientesList ~ clientes:', clientes);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Maneja el cambio de página
    // const handleChangePage = (newPage: any) => {
    //     setPage(newPage);
    // };

    // // Maneja el cambio de filas por página
    // const handleChangeRowsPerPage = () => {
    //     // setRowsPerPage(parseInt(event?.target.value, 10));
    //     // setPage(0);
    // };

    // Calcula los clientes para la página actual
    // const currentClients = clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const currentClients = clientes;
    console.log('🚀 ~ ClientesList ~ currentClients:', currentClients);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h4" gutterBottom>
                Lista de Clientes
            </Typography>

            <TableContainer component={Paper} style={{ maxWidth: 800, backgroundColor: '#333' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#fff' }}>ID</TableCell>
                            <TableCell style={{ color: '#fff' }}>Nombre</TableCell>
                            <TableCell style={{ color: '#fff' }}>Email</TableCell>
                            <TableCell style={{ color: '#fff' }}>Celular</TableCell>
                            <TableCell align="right" style={{ color: '#fff' }}>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentClients.map((cliente: any) => (
                            <TableRow key={cliente.id}>
                                <TableCell style={{ color: '#fff' }}>{cliente.id}</TableCell>
                                <TableCell style={{ color: '#fff' }}>{cliente.nombre}</TableCell>
                                <TableCell style={{ color: '#fff' }}>{cliente.email}</TableCell>
                                <TableCell style={{ color: '#fff' }}>{cliente.telefono}</TableCell>
                                <TableCell align="right">
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(cliente)} style={{ color: '#fff' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(cliente.id)} style={{ color: '#fff' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <TablePagination
                    component="div"
                    count={clientes.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ color: '#fff', backgroundColor: '#333' }}
                /> */}
            </TableContainer>
        </Box>
    );
};

export default ClientesList;
