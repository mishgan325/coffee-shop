const API_URL = process.env.REACT_APP_API_URL;

const request = async (url, method = 'GET', body = null, basicAuthToken = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (basicAuthToken) {
        headers['Authorization'] = basicAuthToken;
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

        // Проверка на наличие тела ответа
        const contentType = response.headers.get('content-type');
        let data = null;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        }

        console.log(`[${method}] Ответ от сервера:`, data);

        if (!response.ok) {
            throw new Error(data?.message || `Ошибка запроса: ${response.status}`);
        }

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

export const getAllCoffees = (basicAuthToken) => request('/admin/coffees', 'GET', null, basicAuthToken);

export const updateCoffee = (coffeeId, coffeeData, basicAuthToken) => request(`/admin/coffees/${coffeeId}`, 'PUT', coffeeData, basicAuthToken);

export const createCoffee = (coffeeData, basicAuthToken) => request('/admin/coffees', 'POST', coffeeData, basicAuthToken);

export const deleteCoffee = (coffeeId, basicAuthToken) => request(`/admin/coffees/${coffeeId}`, 'DELETE', null, basicAuthToken);

// ADDONS

export const getAllAddons = (basicAuthToken) => request('/admin/addons', 'GET', null, basicAuthToken);

export const updateAddon = (addonId, addonData, basicAuthToken) => request(`/admin/addons/${addonId}`, 'PUT', addonData, basicAuthToken);

export const createAddon = (addonData, basicAuthToken) => request('/admin/addons', 'POST', addonData, basicAuthToken);

export const deleteAddon = (addonId, basicAuthToken) => request(`/admin/addons/${addonId}`, 'DELETE', null, basicAuthToken);

// ORDERS

export const getAllOrders = (basicAuthToken) => request('/admin/orders', 'GET', null, basicAuthToken);

export const deleteOrder = (orderId, basicAuthToken) => request(`/admin/orders/${orderId}`, 'DELETE', null, basicAuthToken);
