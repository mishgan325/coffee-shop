import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let cartItemIdCounter = 0;

const CoffeeCard = ({ coffee, addToCart }) => {
    const handleAdd = () => {
        addToCart({
            ...coffee,
            cartItemId: `cart-item-${++cartItemIdCounter}`,
            selectedAdditives: [],
        });
    };

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <img
                src={coffee.image_url || `${process.env.PUBLIC_URL}/placeholder.png`}
                alt={coffee.name}
                className="card-img-top"
                style={{
                    objectFit: 'cover',
                    height: '180px',
                    backgroundColor: '#f8f9fa',
                }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{coffee.name}</h5>
                <p className="text-muted small mb-2">{coffee.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{coffee.price} ₽</span>
                    <button className="btn btn-outline-primary btn-sm px-3 rounded-pill" onClick={handleAdd}>
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
