const API_URL = process.env.REACT_APP_API_URL;

const request = async (url, method = 'GET', body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const config = {
        method, headers,
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

// === USERS ===

export const loginUser = (credentials) => request('/api/users/login', 'POST', credentials);

// === COFFEES ===

export const fetchCoffees = (telegramToken) => request('/api/coffees', 'POST', {telegram_token: telegramToken});

export const createCoffee = (coffeeData, token) => request('/api/coffees', 'POST', coffeeData);

export const deleteCoffee = (coffeeId, token) => request(`/api/coffees/${coffeeId}`, 'DELETE', null);

// === ADDONS ===

export const fetchAddons = (telegramToken) => request('/api/addons', 'POST', {telegram_token: telegramToken});

// Передача токена в теле запроса
export const createAddon = (addonData, token) => request('/api/addons', 'POST', addonData);

export const deleteAddon = (addonId, token) => request(`/api/addons/${addonId}`, 'DELETE', null);

// === ORDERS ===

export const fetchOrders = (telegramToken) => request('/api/users/me/orders', 'POST', {telegram_token: telegramToken});

export const fetchAllOrders = (token) => request('/api/orders', 'GET', null);

export const createOrder = (items, telegramToken) => request('/api/orders', 'POST', {items, telegram_token: telegramToken});

// export const createUserOrder = (orderData) => request('/api/users/me/orders', 'POST', orderData);

export const deleteOrder = (orderId) => request(`/api/orders/${orderId}`, 'DELETE', null);
