import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div>
            Home Page
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/clientes">Clientes</Link>
                <Link to="/citas">Citas</Link>
                <Link to="/atenciones">Atenciones</Link>
            </nav>
        </div>
    );
};
