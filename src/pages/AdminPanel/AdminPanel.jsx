import React, {useEffect, useState} from 'react';
import {
    createAddon,
    createCoffee,
    deleteAddon,
    deleteCoffee,
    getAllAddons,
    getAllCoffees,
    getAllOrders,
    updateAddon,
    updateCoffee
} from '../../api/api';

import AdminCoffeeForm from './AdminCoffeeForm';
import AdminCoffeeList from './AdminCoffeeList';
import AdminAddonForm from './AdminAddonForm';
import AdminAddonList from './AdminAddonList';
import AdminOrderList from './AdminOrderList';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('coffees');

    const [coffees, setCoffees] = useState([]);
    const [addons, setAddons] = useState([]);
    const [orders, setOrders] = useState([]);

    const [coffeeName, setCoffeeName] = useState('');
    const [coffeeDescription, setCoffeeDescription] = useState('');
    const [coffeePrice, setCoffeePrice] = useState('');
    const [coffeeImageUrl, setCoffeeImageUrl] = useState('');
    const [editingCoffee, setEditingCoffee] = useState(null);


    const [addonName, setAddonName] = useState('');
    const [addonPrice, setAddonPrice] = useState('');
    const [editingAddon, setEditingAddon] = useState(null);


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const generateBasicAuthToken = (username, password) => {
        return 'Basic ' + btoa(username + ':' + password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const authToken = generateBasicAuthToken(login, password);
        setToken(authToken);
        setIsLoggedIn(true);
    };

    const loadCoffees = async () => {
        try {
            const data = await getAllCoffees(token);
            setCoffees(data);
        } catch (error) {
            setMessage(`Ошибка загрузки кофе: ${error.message}`);
        }
    };

    const loadAddons = async () => {
        try {
            const data = await getAllAddons(token);
            setAddons(data);
        } catch (error) {
            setMessage(`Ошибка загрузки добавок: ${error.message}`);
        }
    };

    const loadOrders = async () => {
        try {
            const data = await getAllOrders(token);
            setOrders(data);
        } catch (error) {
            setMessage(`Ошибка загрузки заказов: ${error.message}`);
        }
    };

    const handleEditCoffee = (coffee) => {
        setCoffeeName(coffee.name);
        setCoffeeDescription(coffee.description);
        setCoffeePrice(coffee.price.toString());
        setCoffeeImageUrl(coffee.image_url);
        setEditingCoffee(coffee);
    };

    const handleCancelEdit = () => {
        clearForm();
    };

    const clearForm = () => {
        setCoffeeName('');
        setCoffeeDescription('');
        setCoffeePrice('');
        setCoffeeImageUrl('');
        setEditingCoffee(null);
    };


    const handleSubmitCoffee = async (e) => {
        e.preventDefault();
        const coffeeData = {
            name: coffeeName,
            description: coffeeDescription,
            price: parseFloat(coffeePrice),
            imageUrl: coffeeImageUrl,
        };

        try {
            setLoading(true);
            if (editingCoffee) {
                await updateCoffee(editingCoffee.coffee_id, coffeeData, token);
                setMessage('Кофе обновлено!');
            } else {
                await createCoffee(coffeeData, token);
                setMessage('Кофе успешно добавлено!');
            }
            clearForm();
            loadCoffees();
        } catch (error) {
            setMessage(`Ошибка: ${error.message}`);
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

    // ==ADDONS==

    const handleSubmitAddon = async (e) => {
        e.preventDefault();
        const addonData = {
            name: addonName,
            price: parseFloat(addonPrice),
        };
        try {
            setLoading(true);
            if (editingAddon) {
                await updateAddon(editingAddon.addon_id, addonData, token);
                setMessage('Добавка обновлена!');
            } else {
                await createAddon(addonData, token);
                setMessage('Добавка успешно добавлена!');
            }
            clearAddonForm();
            loadAddons();
        } catch (error) {
            setMessage(`Ошибка: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditAddon = (addon) => {
        setAddonName(addon.name);
        setAddonPrice(addon.price.toString());
        setEditingAddon(addon);
    };

    const handleCancelEditAddon = () => {
        clearAddonForm();
    };

    const clearAddonForm = () => {
        setAddonName('');
        setAddonPrice('');
        setEditingAddon(null);
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

    useEffect(() => {
        if (isLoggedIn) {
            loadCoffees();
            loadAddons();
            loadOrders();
        }
    }, [isLoggedIn]);


    if (!isLoggedIn) {
        return (
            <div className="container mt-5" style={{maxWidth: '400px'}}>
                <h3 className="mb-3">Вход в админ-панель</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Войти</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Админ-панель</h2>
            <ul className="nav nav-tabs mb-4" style={{borderBottom: '2px solid #dee2e6'}}>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'coffees' ? 'active bg-primary text-white' : ''}`}
                        style={{borderRadius: '0.5rem 0.5rem 0 0'}}
                        onClick={() => setActiveTab('coffees')}
                    >
                        ☕ Кофе
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'addons' ? 'active bg-primary text-white' : ''}`}
                        style={{borderRadius: '0.5rem 0.5rem 0 0'}}
                        onClick={() => setActiveTab('addons')}
                    >
                        ➕ Добавки
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'orders' ? 'active bg-primary text-dark' : ''}`}
                        style={{borderRadius: '0.5rem 0.5rem 0 0'}}
                        onClick={() => setActiveTab('orders')}
                    >
                        📦 Заказы
                    </button>
                </li>
            </ul>

            {activeTab === 'coffees' && (
                <>
                    <AdminCoffeeForm
                        onSubmit={handleSubmitCoffee}
                        loading={loading}
                        coffeeName={coffeeName}
                        setCoffeeName={setCoffeeName}
                        coffeeDescription={coffeeDescription}
                        setCoffeeDescription={setCoffeeDescription}
                        coffeePrice={coffeePrice}
                        setCoffeePrice={setCoffeePrice}
                        coffeeImageUrl={coffeeImageUrl}
                        setCoffeeImageUrl={setCoffeeImageUrl}
                        isEditing={!!editingCoffee}
                        onCancelEdit={handleCancelEdit}
                    />
                    <AdminCoffeeList
                        coffees={coffees}
                        onDelete={handleDeleteCoffee}
                        onEdit={handleEditCoffee}
                    />
                </>
            )}

            {activeTab === 'addons' && (
                <>
                    <AdminAddonForm
                        onSubmit={handleSubmitAddon}
                        loading={loading}
                        addonName={addonName}
                        setAddonName={setAddonName}
                        addonPrice={addonPrice}
                        setAddonPrice={setAddonPrice}
                        isEditing={!!editingAddon}
                        onCancelEdit={handleCancelEditAddon}
                    />
                    <AdminAddonList
                        addons={addons}
                        onDelete={handleDeleteAddon}
                        onEdit={handleEditAddon}
                    />
                </>
            )}

            {activeTab === 'orders' && (
                <>
                    <AdminOrderList orders={orders}/>
                </>
            )}

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default AdminPanel;
