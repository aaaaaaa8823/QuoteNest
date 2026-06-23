// src/pages/CreateQuote.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quoteService } from '../api/quoteService';
import Navbar from '../components/Navbar';
import './CreateQuote.css';

function CreateQuote() {
    const [formData, setFormData] = useState({
        text: '',
        author: '',
        source: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await quoteService.create(formData);
            setSuccess(true);
            // Очищаем форму
            setFormData({ text: '', author: '', source: '' });
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при создании цитаты');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="create-container">
                <div className="create-card">
                    <h2>Создать цитату</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Цитата успешно создана!</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="text">Текст цитаты *</label>
                            <textarea
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                placeholder="Введите текст цитаты..."
                                required
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Автор *</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Имя автора"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="source">Источник (необязательно)</label>
                            <input
                                id="source"
                                name="source"
                                type="text"
                                value={formData.source}
                                onChange={handleChange}
                                placeholder="Название книги, статьи и т.д."
                            />
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="submit-btn"
                            >
                                {loading ? 'Создание...' : 'Создать цитату'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/home')}
                                className="cancel-btn"
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateQuote;