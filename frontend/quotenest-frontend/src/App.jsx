import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// import Home from './pages/Home'; // позже

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                
                {/* Позже добавим защищённые страницы */}
                {/* <Route path="/quotes" element={<QuotesPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;