import api from './axios';

export const authService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
            return null; 
        }
        throw err;
    }
},
};
