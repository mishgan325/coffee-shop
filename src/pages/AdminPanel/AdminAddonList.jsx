import React from 'react';

const AdminAddonList = ({ addons, onDelete }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все добавки</h3>
        <ul className="list-group">
            {addons.map((addon) => (
                <li key={addon.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {addon.name}
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(addon.id)}
                    >
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminAddonList;
