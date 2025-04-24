import React, { useState } from 'react';

const CoffeeCard = ({ coffee }) => {
    const [additives, setAdditives] = useState([]);

    const handleAdditiveChange = (additive) => {
        setAdditives((prev) =>
            prev.includes(additive)
                ? prev.filter((item) => item !== additive)
                : [...prev, additive]
        );
    };

    return (
        <div className="coffee-card">
            <img src={coffee.image} alt={coffee.name} className="coffee-image" />
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <p className="price">${coffee.price}</p>

            <div className="additives">
                <h4>Additives:</h4>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => handleAdditiveChange('Sugar')}
                    />
                    Sugar
                </label>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => handleAdditiveChange('Milk')}
                    />
                    Milk
                </label>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => handleAdditiveChange('Vanilla')}
                    />
                    Vanilla
                </label>
            </div>

            <button className="add-btn">
                Add to Cart ({additives.length ? `+ ${additives.join(', ')}` : 'No Additives'})
            </button>
        </div>
    );
};

export default CoffeeCard;
