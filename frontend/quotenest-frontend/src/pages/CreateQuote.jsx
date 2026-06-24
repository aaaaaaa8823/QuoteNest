// src/pages/CreateQuote.jsx
import { useState, useEffect } from 'react';
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
    const [myQuotes, setMyQuotes] = useState([]);
    const [loadingQuotes, setLoadingQuotes] = useState(true);
    const [deleting, setDeleting] = useState({});
    const navigate = useNavigate();

      useEffect(() => {
        fetchMyQuotes();
    }, []);

    const fetchMyQuotes = async () => {
        setLoadingQuotes(true);
        try {
            const data = await quoteService.getMyQuotes();
            if (Array.isArray(data)) {
                setMyQuotes(data);
            } else {
                setMyQuotes([]);
            }
        } catch (err) {
            console.error('Ошибка загрузки цитат:', err);
            setMyQuotes([]);
        } finally {
            setLoadingQuotes(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const newQuote = await quoteService.create(formData);
            setSuccess(true);
            setMyQuotes(prev => [newQuote, ...prev]);
            setFormData({ text: '', author: '', source: '' });
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при создании цитаты');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (quoteId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту цитату?')) {
            return;
        }

        setDeleting(prev => ({ ...prev, [quoteId]: true }));
        try {
            await quoteService.delete(quoteId);
            setMyQuotes(prev => prev.filter(q => q.id !== quoteId));
        } catch (err) {
            console.error('Ошибка удаления:', err);
            alert('Не удалось удалить цитату');
        } finally {
            setDeleting(prev => ({ ...prev, [quoteId]: false }));
        }
    };


    const isMyQuote = (quote) => {
        return true; 
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

                <div className="my-quotes-section">
                    <h3>Мои цитаты</h3>
                    
                    {loadingQuotes ? (
                        <p>Загрузка...</p>
                    ) : myQuotes.length === 0 ? (
                        <p className="no-quotes">Вы еще не создали ни одной цитаты</p>
                    ) : (
                        <div className="my-quotes-list">
                            {myQuotes.map(quote => (
                                <div key={quote.id} className="quote-card">
                                    <p>"{quote.text}"</p>
                                    <small>— {quote.author}</small>
                                    {quote.source && <div className="quote-source">Источник: {quote.source}</div>}
                                    
                                    <div className="quote-actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(quote.id)}
                                            disabled={deleting[quote.id]}
                                        >
                                            {deleting[quote.id] ? '...' : 'Удалить'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CreateQuote;