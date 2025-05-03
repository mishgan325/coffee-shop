import React from 'react';

const AdminCoffeeList = ({ coffees, onDelete }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все кофе</h3>
        <ul className="list-group">
            {coffees.map((coffee) => (
                <li key={coffee.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{coffee.name}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(coffee.id)}>
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminCoffeeList;
