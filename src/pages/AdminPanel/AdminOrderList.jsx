import React from 'react';

const AdminOrderList = ({ orders, onDelete }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все заказы</h3>
        <ul className="list-group">
            {orders.map((order) => (
                <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                    Заказ №{order.id}
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(order.id)}>
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminOrderList;
