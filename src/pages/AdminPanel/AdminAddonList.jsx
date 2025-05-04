import React from 'react';

const AdminAddonList = ({ addons, onDelete, onEdit }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все добавки</h3>
        <ul className="list-group">
            {addons.map((addon) => (
                <li key={addon.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{addon.name} — {addon.price}₽</span>
                    <div>
                        <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() => onEdit(addon)}
                        >
                            Редактировать
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => onDelete(addon.addon_id)}
                        >
                            Удалить
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminAddonList;
