import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { quoteService } from '../api/quoteService';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
    const { user } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const data = await quoteService.getAll();
                if (Array.isArray(data)) {
                    setQuotes(data);
                } else {
                    console.error('Получены не массив:', data);
                    setQuotes([]); 
                }
            } catch (err) {
                console.error(err);
                setQuotes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

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
                            <div key={quote.id} className="quote-card">
                                <p>"{quote.text}"</p>
                                <small>— {quote.author}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;