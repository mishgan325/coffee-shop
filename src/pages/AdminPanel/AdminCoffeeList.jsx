import React from 'react';

const AdminCoffeeList = ({ coffees, onDelete, onEdit }) => (
    <div className="mb-4">
        <h3 className="mb-3">Все кофе</h3>
        <ul className="list-group">
            {coffees.map((coffee) => (
                <li key={coffee.id} className="list-group-item">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={coffee.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                                alt={coffee.name}
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                                <h5 className="mb-1">{coffee.name}</h5>
                                <p className="mb-1 text-muted" style={{ maxWidth: '300px' }}>{coffee.description}</p>
                                <strong>{coffee.price} ₽</strong>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(coffee)}>
                                Редактировать
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(coffee.coffee_id)}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default AdminCoffeeList;
