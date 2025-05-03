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

    useEffect(() => {
        const initData = window.Telegram?.WebApp?.initData || '';
        if (initData) {
            loginUser({ init_data: initData })
                .then((data) => {
                    setToken(data.telegramId);
                })
                .catch((err) => {
                    console.error('Ошибка авторизации:', err);
                });
        }
    }, []);

    const addToCart = (coffee) => setCart([...cart, coffee]);
    const removeFromCart = (cartItemId) => setCart(cart.filter(item => item.cartItemId !== cartItemId));

    return (
        <Router>
            <div>
                <Navbar cartCount={cart.length} token={token}/>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CoffeeList addToCart={addToCart} token={token} />} />
                        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} token={token}/>} />
                        <Route path="/orders" element={<MyOrders token={token} />} />
                        <Route path="/admin" element={<AdminPanel />} /> {/* Добавляем путь для админ-панели */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
