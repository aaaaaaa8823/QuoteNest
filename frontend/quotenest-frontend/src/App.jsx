import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

function App() {
  const { user, loading } = useAuth();
  if (loading) {
        return <div>Загрузка...</div>;
    }

    const isAuthenticated = !!user;

    return (
        <div className="App">
            <Routes>
              <Route path="/" element={
                    !isAuthenticated ? <AuthPage /> : <Navigate to="/home" />
                } />
                <Route path="/home" element={
                    isAuthenticated ? <Home /> : <Navigate to="/" />
                } />
                
                <Route path="/login" element={
                    !isAuthenticated ? <AuthPage /> : <Navigate to="/home" />
                } />
                
                <Route path="/register" element={
                    !isAuthenticated ? <AuthPage /> : <Navigate to="/home" />
                } />
                
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </div>
    );
}

export default App;