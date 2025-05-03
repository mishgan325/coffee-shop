const API_URL = process.env.REACT_APP_API_URL;

const request = async (url, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Если есть токен для авторизации, добавляем его в заголовки
    if (token) {
        headers['Authorization'] = `Basic ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        console.log(`[${method}] ${url}`, body);
        const response = await fetch(`${API_URL}${url}`, config);
        const data = await response.json();

        console.log(`[${method}] Ответ от сервера:`, data);

        if (!response.ok) throw new Error(data?.message || 'Ошибка запроса');

        return data;
    } catch (error) {
        console.error(`[${method}] Ошибка:`, error.message || error);
        throw error;
    }
};

// === BASIC USER ===

// USERS

export const loginUser = (credentials) => request('/api/users/login', 'POST', credentials);

// COFFEES

export const fetchCoffees = (telegramToken) => request('/api/coffees', 'POST', {telegram_token: telegramToken});

// ADDONS

export const fetchAddons = (telegramToken) => request('/api/addons', 'POST', {telegram_token: telegramToken});

// ORDERS

export const fetchMyOrders = (telegramToken) => request('/api/users/me/orders', 'POST', {telegram_token: telegramToken});

export const createOrder = (items, telegramToken) => request('/api/orders', 'POST', {items, telegram_token: telegramToken});


// === ADMIN USER ===

// COFFEE

export const createCoffee = (coffeeData, token) => request('/api/coffees', 'POST', coffeeData, token);

export const deleteCoffee = (coffeeId, token) => request(`/api/coffees/${coffeeId}`, 'DELETE', null, token);

// ADDONS

export const createAddon = (addonData, token) => request('/api/addons', 'POST', addonData, token);

export const deleteAddon = (addonId, token) => request(`/api/addons/${addonId}`, 'DELETE', null, token);

// ORDERS

export const fetchAllOrders = (token) => request('/api/orders', 'GET', null, token);

export const deleteOrder = (orderId, token) => request(`/api/orders/${orderId}`, 'DELETE', null, token);
