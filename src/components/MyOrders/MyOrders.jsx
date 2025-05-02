import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../api/api';
import OrderItem from './OrderItem';
import { FaRegCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

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
                const data = await fetchOrders(token);
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
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-3">Загрузка заказов...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger mt-4 text-center">Ошибка: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">🧾 Мои заказы</h2>
            {orders.length === 0 ? (
                <p className="text-center text-muted">У вас пока нет заказов ☹️</p>
            ) : (
                <div className="row row-cols-1 g-4">
                    {orders.map((order) => (
                        <div key={order.id} className="col">
                            <div className="card border-light shadow-sm">
                                <div className="card-header bg-white fw-bold">
                                    Заказ #{order.id}
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between text-muted mb-3">
                                        <span>
                                            <FaRegCalendarAlt className="me-1" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                        <span>
                                            <FaMoneyBillWave className="me-1" />
                                            {order.total_price} ₽
                                        </span>
                                    </div>

                                    {order.items.map((item, idx) => (
                                        <OrderItem key={idx} {...item} />
                                    ))}
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
