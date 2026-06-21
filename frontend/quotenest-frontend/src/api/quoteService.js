import api from './axios';

export const quoteService = {
    // Получить все цитаты
    getAll: () => api.get('/quotes'),

    // Получить одну цитату
    getById: (id) => api.get(`/quotes/${id}`),

    // Создать новую цитату
    create: (data) => api.post('/quotes', data),

    // Обновить цитату
    update: (id, data) => api.put(`/quotes/${id}`, data),

    // Удалить цитату
    delete: (id) => api.delete(`/quotes/${id}`),
};