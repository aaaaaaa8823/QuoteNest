import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">QuoteNest</Link>
            </div>

            <div className="nav-links">
                <Link to="/">Рекомендации</Link>
                <Link to="/create">Создать цитату</Link>
                <Link to="/saved">Мои цитаты</Link>
            </div>

            <div className="nav-user">
                {user ? (
                    <>
                        <span>{user.username}</span>
                        <button onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;