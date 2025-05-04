import React from 'react';

const AdminOrderList = ({ orders }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все заказы</h3>
        <ul className="list-group">
            {orders.map((order) => (
                <li
                    key={order.id}
                    className="list-group-item"
                >
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>Заказ №{order.id}</strong><br />
                            <small className="text-muted">
                                От: {order.orderer.firstName} @{order.orderer.username} (ID: {order.orderer.telegramId})
                            </small><br />
                            <small className="text-muted">
                                Дата: {new Date(order.createdAt).toLocaleString()}
                            </small>

                            <div className="mt-2">
                                {order.items.map((item, index) => (
                                    <div key={index}>
                                        ☕ <strong>{item.coffeeName}</strong>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2 fw-bold">
                                Итого: {order.totalPrice}₽
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminOrderList;
