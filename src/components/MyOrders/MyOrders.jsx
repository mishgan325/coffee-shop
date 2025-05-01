import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../api/api'; // Импортируем функцию из api.js

const MyOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError('Необходимо войти в систему');
            setLoading(false);
            return;
        }

        const loadOrders = async () => {
            try {
                const data = await fetchOrders(token); // Используем fetchOrders из api.js
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [token]);

    if (loading) {
        return <div className="text-center mt-4">Загрузка...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4 text-center">Ошибка: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Мои заказы</h2>
            {orders.length === 0 ? (
                <p className="text-center">У вас нет заказов.</p>
            ) : (
                <div className="row row-cols-1 g-4">
                    {orders.map((order) => (
                        <div key={order.id} className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Заказ #{order.id}</h5>
                                    <p className="card-subtitle text-muted mb-2">
                                        Дата: {new Date(order.date).toLocaleDateString()}
                                    </p>

                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="mb-2 border-bottom pb-2">
                                            <h6>{item.name}</h6>
                                            <p className="mb-1">Цена: ${item.price}</p>
                                            {item.additives?.length > 0 && (
                                                <div>
                                                    <strong>Добавки:</strong>
                                                    <ul className="mb-0">
                                                        {item.additives.map((additive) => (
                                                            <li key={additive.id}>{additive.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <p className="fw-bold mt-3">Итог: ${order.total}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
