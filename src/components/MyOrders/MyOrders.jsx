import React, { useState, useEffect } from 'react';
import './MyOrders.css'; // Стиль для страницы "Мои заказы"

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);  // Статус загрузки
    const [error, setError] = useState(null);      // Статус ошибки

    useEffect(() => {
        // fetch('/api/orders')
        fetch(`${process.env.PUBLIC_URL}/api/orders.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить заказы');
                }
                return response.json();
            })
            .then((data) => {
                setOrders(data);
                setLoading(false);  // Завершаем загрузку
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);  // Завершаем загрузку даже при ошибке
            });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;  // Отображаем индикатор загрузки
    }

    if (error) {
        return <div>Ошибка: {error}</div>;  // Показываем ошибку, если она произошла
    }

    return (
        <div className="orders-container">
            <h2 className="orders-title">Мои заказы</h2>
            {orders.length === 0 ? (
                <p>У вас нет заказов.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <h4>Заказ #{order.id}</h4>
                            <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="order-item">
                                        <h5>{item.name}</h5>
                                        <p>Цена: ${item.price}</p>
                                        {item.additives?.length > 0 && (
                                            <div className="order-additives">
                                                <p>Добавки:</p>
                                                <ul>
                                                    {item.additives.map((additive) => (
                                                        <li key={additive.id}>{additive.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="order-total">Итог: ${order.total}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
