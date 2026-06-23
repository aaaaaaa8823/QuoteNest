import api from './axios';

const handleResponse = (promise) => promise.then(res => res.data);

export const quoteService = {
    getAll: () => handleResponse(api.get('/quotes')),
    getById: (id) => handleResponse(api.get(`/quotes/${id}`)),
    create: (data) => handleResponse(api.post('/quotes', data)),
    update: (id, data) => handleResponse(api.put(`/quotes/${id}`, data)),
    delete: (id) => handleResponse(api.delete(`/quotes/${id}`)),
};