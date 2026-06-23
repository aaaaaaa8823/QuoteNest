// src/pages/SavedQuotes.jsx
import { useEffect, useState } from 'react';
import { quoteService } from '../api/quoteService';
import Navbar from '../components/Navbar';
import './SavedQuotes.css';

function SavedQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState({});

    useEffect(() => {
        fetchSavedQuotes();
    }, []);

    const fetchSavedQuotes = async () => {
        try {
            const data = await quoteService.getSavedQuotes();
            if (Array.isArray(data)) {
                setQuotes(data.map(q => ({ ...q, saved: true })));
            } else {
                setQuotes([]);
            }
        } catch (err) {
            console.error('Ошибка загрузки сохраненных цитат:', err);
            setQuotes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (quoteId) => {
        setRemoving(prev => ({ ...prev, [quoteId]: true }));
        try {
            await quoteService.unsaveQuote(quoteId);
            setQuotes(prev => prev.filter(q => q.id !== quoteId));
        } catch (err) {
            console.error('Ошибка удаления из сохраненных:', err);
            alert('Не удалось удалить из сохраненных');
        } finally {
            setRemoving(prev => ({ ...prev, [quoteId]: false }));
        }
    };

    return (
        <>
            <Navbar />
            <div className="saved-container">
                <h1>Мои сохраненные цитаты</h1>

                {loading ? (
                    <p>Загрузка...</p>
                ) : quotes.length === 0 ? (
                    <div className="no-quotes">
                        <p>У вас пока нет сохраненных цитат</p>
                        <p className="hint">Перейдите на главную и сохраните понравившиеся цитаты</p>
                    </div>
                ) : (
                    <div className="quotes-list">
                        {quotes.map(quote => (
                            <div key={quote.id} className="quote-card">
                                <p>"{quote.text}"</p>
                                <small>— {quote.author}</small>
                                {quote.source && <div className="quote-source">Источник: {quote.source}</div>}
                                
                                <div className="quote-actions">
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemove(quote.id)}
                                        disabled={removing[quote.id]}
                                    >
                                        {removing[quote.id] ? '...' : 'Удалить'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SavedQuotes;