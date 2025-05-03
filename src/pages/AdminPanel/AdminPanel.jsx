import React, { useState, useEffect } from 'react';
import {
    createCoffee, deleteCoffee, fetchCoffees,
    createAddon, deleteAddon, fetchAddons,
    createOrder, deleteOrder, fetchAllOrders
} from '../../api/api';

import AdminCoffeeForm from './AdminCoffeeForm';
import AdminCoffeeList from './AdminCoffeeList';
import AdminAddonForm from './AdminAddonForm';
import AdminAddonList from './AdminAddonList';
import AdminOrderForm from './AdminOrderForm';
import AdminOrderList from './AdminOrderList';

const AdminPanel = () => {
    const [coffees, setCoffees] = useState([]);
    const [addons, setAddons] = useState([]);
    const [orders, setOrders] = useState([]);
    const [coffeeName, setCoffeeName] = useState('');
    const [coffeeDescription, setCoffeeDescription] = useState('');
    const [coffeePrice, setCoffeePrice] = useState('');
    const [coffeeImageUrl, setCoffeeImageUrl] = useState('');
    const [addonName, setAddonName] = useState('');
    const [addonPrice, setAddonPrice] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = 'your_token'; // замените на реальный токен

    useEffect(() => {
        loadCoffees();
        loadAddons();
        loadOrders();
    }, []);

    const loadCoffees = async () => {
        try {
            const data = await fetchCoffees(token);
            setCoffees(data);
        } catch (error) {
            setMessage(`Ошибка загрузки кофе: ${error.message}`);
        }
    };

    const loadAddons = async () => {
        try {
            const data = await fetchAddons(token);
            setAddons(data);
        } catch (error) {
            setMessage(`Ошибка загрузки добавок: ${error.message}`);
        }
    };

    const loadOrders = async () => {
        try {
            const data = await fetchAllOrders(token);
            setOrders(data);
        } catch (error) {
            setMessage(`Ошибка загрузки заказов: ${error.message}`);
        }
    };

    const handleAddCoffee = async (e) => {
        e.preventDefault();
        const coffeeData = {
            name: coffeeName,
            description: coffeeDescription,
            price: parseFloat(coffeePrice),
            imageUrl: coffeeImageUrl,
        };
        try {
            setLoading(true);
            await createCoffee(coffeeData, token);
            setMessage('Кофе успешно добавлено!');
            loadCoffees();
        } catch (error) {
            setMessage(`Ошибка при добавлении кофе: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCoffee = async (coffeeId) => {
        try {
            setLoading(true);
            await deleteCoffee(coffeeId, token);
            setMessage('Кофе удалено!');
            loadCoffees();
        } catch (error) {
            setMessage(`Ошибка при удалении кофе: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddon = async (e) => {
        e.preventDefault();
        const addonData = { name: addonName, price: parseFloat(addonPrice) };
        try {
            setLoading(true);
            await createAddon(addonData, token);
            setMessage('Добавка успешно добавлена!');
            loadAddons();
        } catch (error) {
            setMessage(`Ошибка при добавлении добавки: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddon = async (addonId) => {
        try {
            setLoading(true);
            await deleteAddon(addonId, token);
            setMessage('Добавка удалена!');
            loadAddons();
        } catch (error) {
            setMessage(`Ошибка при удалении добавки: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        const items = []; // Пример. Заменить на реальные данные, если нужно
        try {
            setLoading(true);
            await createOrder(items, token);
            setMessage('Заказ успешно создан!');
            loadOrders();
        } catch (error) {
            setMessage(`Ошибка при создании заказа: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            setLoading(true);
            await deleteOrder(orderId, token);
            setMessage('Заказ удален!');
            loadOrders();
        } catch (error) {
            setMessage(`Ошибка при удалении заказа: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Админ-панель</h2>

            <AdminCoffeeForm
                onSubmit={handleAddCoffee}
                loading={loading}
                coffeeName={coffeeName}
                setCoffeeName={setCoffeeName}
                coffeeDescription={coffeeDescription}
                setCoffeeDescription={setCoffeeDescription}
                coffeePrice={coffeePrice}
                setCoffeePrice={setCoffeePrice}
                coffeeImageUrl={coffeeImageUrl}
                setCoffeeImageUrl={setCoffeeImageUrl}
            />

            <AdminCoffeeList
                coffees={coffees}
                onDelete={handleDeleteCoffee}
            />

            <AdminAddonForm
                onSubmit={handleAddAddon}
                loading={loading}
                addonName={addonName}
                setAddonName={setAddonName}
                addonPrice={addonPrice}
                setAddonPrice={setAddonPrice}
            />

            <AdminAddonList
                addons={addons}
                onDelete={handleDeleteAddon}
            />

            <AdminOrderForm
                onSubmit={handleCreateOrder}
                loading={loading}
            />

            <AdminOrderList
                orders={orders}
                onDelete={handleDeleteOrder}
            />

            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPanel;
