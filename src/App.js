import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CoffeeList from './components/CoffeeList/CoffeeList';
import Cart from './components/Cart/Cart';
import MyOrders from './components/MyOrders/MyOrders';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [cart, setCart] = useState([]);

  // Добавление товара в корзину
  const addToCart = (coffee) => {
    setCart([...cart, coffee]);
  };

  // Удаление товара из корзины
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Отправка заказа (например, через POST запрос)
  const handleOrder = () => {
    // Логика отправки заказа на сервер
    // Например, если заказ отправлен, очищаем корзину:
    setCart([]);
  };

  return (
      <Router>
        <div>
          {/* Навигационное меню */}
          <Navbar cartCount={cart.length} />

          <div className="container">
            <Routes>
              <Route path="/" element={<CoffeeList addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
