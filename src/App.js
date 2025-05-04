import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CoffeeList from './components/CoffeeList/CoffeeList';
import Cart from './components/Cart/Cart';
import MyOrders from './components/MyOrders/MyOrders';
import Navbar from './components/Navbar/Navbar';
import { loginUser } from './api/api';
import AdminPanel from "./pages/AdminPanel/AdminPanel";

const App = () => {
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        const initData = window.Telegram?.WebApp?.initData || '';
        if (initData) {
            loginUser({ init_data: initData })
                .then((data) => {
                    setToken(data.telegramId);
                    setIsLoading(false); // Завершаем загрузку
                })
                .catch((err) => {
                    console.error('Ошибка авторизации:', err);
                    setIsLoading(false); // Завершаем загрузку даже при ошибке
                });
        } else {
            setIsLoading(false); // Если нет данных для авторизации
        }
    }, []);

    const addToCart = (coffee) => setCart([...cart, coffee]);
    const removeFromCart = (cartItemId) => setCart(cart.filter(item => item.cartItemId !== cartItemId));

    if (isLoading) {
        return <div className="loading">Загрузка...</div>; // Показываем индикатор загрузки
    }

    return (
        <Router>
            <div>
                {!isLoading && <Navbar cartCount={cart.length} token={token} />}
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CoffeeList addToCart={addToCart} token={token} />} />
                        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} token={token} />} />
                        <Route path="/orders" element={<MyOrders token={token} />} />
                        <Route path="/admin" element={<AdminPanel />} /> {/* Путь для админ-панели */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
