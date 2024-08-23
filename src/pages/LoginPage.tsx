import {
    Alert,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AcUnitIcon from '@mui/icons-material/AcUnit';
export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        // {
        //     "email": "admin@admin.com",
        //     "passwordHash": "@Admin123"
        // }

        const credentials = {
            email: username,
            passwordHash: password,
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            const data = await response.json();
            login(data.token); // Guarda el token usando el Context
        } catch (error) {
            setError('Failed to login. Please check your credentials and try again.' + error);
            setOpen(true);
            // Abre el diálogo de error
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '80vh', // Asegura que el contenedor tenga la altura completa de la ventana
                    alignItems: 'center', // Centra horizontalmente
                    justifyContent: 'center', // Centra verticalmente
                    padding: 3, // Agrega algo de padding alrededor
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                {/* // Asegura que el formulario use todo el ancho del contenedor */}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {open && (
                        <Alert severity="error" sx={{ width: '91%', mt: 1 }}>
                            {error}
                        </Alert>
                    )}

                    <Button type="submit" endIcon={<AcUnitIcon />} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
