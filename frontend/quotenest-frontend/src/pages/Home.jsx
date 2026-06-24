import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { quoteService } from '../api/quoteService';
import Navbar from '../components/Navbar';
import QuoteModal from '../components/QuoteModаl';
import './Home.css';

function Home() {
    const { user } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});
    const [savedIds, setSavedIds] = useState(new Set());
      const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Загружаем все цитаты и сохраненные одновременно
            const [allQuotes, savedQuotes] = await Promise.all([
                quoteService.getAll(),
                quoteService.getSavedQuotes()
            ]);

            const savedIdsSet = new Set(savedQuotes.map(q => q.id));
            setSavedIds(savedIdsSet);

            if (Array.isArray(allQuotes)) {
                const markedQuotes = allQuotes.map(q => ({
                    ...q,
                    saved: savedIdsSet.has(q.id)
                }));
                setQuotes(markedQuotes);
            } else {
                setQuotes([]);
            }
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            setQuotes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (quoteId) => {
        setSaving(prev => ({ ...prev, [quoteId]: true }));
        try {
            await quoteService.saveQuote(quoteId);
            setSavedIds(prev => new Set([...prev, quoteId]));
            setQuotes(prev => prev.map(q => 
                q.id === quoteId ? { ...q, saved: true } : q
            ));
        } catch (err) {
            console.error('Ошибка сохранения:', err);
            alert('Не удалось сохранить цитату');
        } finally {
            setSaving(prev => ({ ...prev, [quoteId]: false }));
        }
    };

    const handleUnsave = async (quoteId) => {
        setSaving(prev => ({ ...prev, [quoteId]: true }));
        try {
            await quoteService.unsaveQuote(quoteId);
            
             setSavedIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(quoteId);
                return newSet;
            });
            
            setQuotes(prev => prev.map(q => 
                q.id === quoteId ? { ...q, saved: false } : q
            ));
        } catch (err) {
            console.error('Ошибка удаления из сохраненных:', err);
            alert('Не удалось удалить из сохраненных');
        } finally {
            setSaving(prev => ({ ...prev, [quoteId]: false }));
        }
    };

    const handleQuoteClick = (quote) => {
        setSelectedQuote(quote);
    };

    const closeModal = () => {
        setSelectedQuote(null);
    };
    
return (
        <>
            <Navbar />
            <div className="home-container">
                <h1>Рекомендации</h1>

                {loading ? (
                    <p>Загрузка цитат...</p>
                ) : (
                    <div className="quotes-list">
                        {quotes.map(quote => (
                            <div 
                                key={quote.id} 
                                className="quote-card"
                                onClick={() => handleQuoteClick(quote)} 
                            >
                                <p>"{quote.text}"</p>
                                <small>— {quote.author}</small>
                                {quote.source && <div className="quote-source">Источник: {quote.source}</div>}
                                {quote.createdByUsername && (
                                    <div className="quote-meta">
                                        Опубликовал: <strong>{quote.createdByUsername}</strong>
                                    </div>
                                )}
                                <div className="quote-actions">
                                    <button 
                                        className={`save-btn ${quote.saved ? 'saved' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            quote.saved ? handleUnsave(quote.id) : handleSave(quote.id);
                                        }}
                                        disabled={saving[quote.id]}
                                    >
                                        {saving[quote.id] ? (
                                            '...'
                                        ) : quote.saved ? (
                                            'Сохранено'
                                        ) : (
                                            'Сохранить'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedQuote && (
                <QuoteModal quote={selectedQuote} onClose={closeModal} />
            )}
        </>
    );
}
export default Home;