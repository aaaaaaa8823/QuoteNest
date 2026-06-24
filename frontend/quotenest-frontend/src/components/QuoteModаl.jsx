import { useEffect } from 'react';
import './QuoteModal.css';

function QuoteModal({ quote, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!quote) return null;

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>
                <div className="modal-body">
                    <p className="modal-text">"{quote.text}"</p>
                    <p className="modal-author">— {quote.author}</p>
                    {quote.source && (
                        <p className="modal-source">Источник: {quote.source}</p>
                    )}
                    {quote.createdByUsername && (
                        <p className="modal-meta">Опубликовал: {quote.createdByUsername}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuoteModal;