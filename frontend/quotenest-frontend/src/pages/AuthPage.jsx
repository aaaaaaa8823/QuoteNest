import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import './AuthPage.css';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await authService.login({
                    email: formData.email,
                    password: formData.password
                });

                const userData = await authService.getCurrentUser();
                login(userData);
                navigate('/home');
            } else {
                await authService.register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName
                });
                setIsLogin(true); 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

                {}
                <div className="tabs">
                    <button 
                        className={isLogin ? 'active' : ''} 
                        onClick={() => setIsLogin(true)}
                    >
                        Войти
                    </button>
                    <button 
                        className={!isLogin ? 'active' : ''} 
                        onClick={() => setIsLogin(false)}
                    >
                        Регистрация
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Имя пользователя" 
                                value={formData.username}
                                onChange={handleChange}
                                required 
                            />
                            <input 
                                type="text" 
                                name="fullName" 
                                placeholder="Полное имя (необязательно)" 
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Пароль" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;