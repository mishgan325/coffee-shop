import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const OrderItem = ({ coffee_name, addons }) => {
    return (
        <div className="mb-3">
            <h6 className="mb-1">
                ☕ <strong>{coffee_name}</strong>
            </h6>
            {addons && addons.length > 0 && (
                <div className="ms-3">
                    {/*<div className="text-muted small">Добавки:</div>*/}
                    <ul className="list-unstyled mb-0">
                        {addons.map((addon, index) => (
                            <li key={index}>
                                <FaPlusCircle className="text-secondary me-1" />
                                {addon}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderItem;
