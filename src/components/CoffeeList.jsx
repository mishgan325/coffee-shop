import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoffeeList = ({ addToCart }) => {
    const [coffeeList, setCoffeeList] = useState([]);

    useEffect(() => {
        // Загрузка данных кофе (с локального JSON файла или API)
        fetch('/api/coffees.json')
            .then((response) => response.json())
            .then((data) => setCoffeeList(data))
            .catch((error) => console.error('Error fetching coffee list:', error));
    }, []);

    return (
        <div>
            <h2>Наши Кофе</h2>
            <div className="coffee-list">
                {coffeeList.map((coffee) => (
                    <div key={coffee.id} className="coffee-item">
                        {/* Используем картинку из public */}
                        <img src={coffee.image} alt={coffee.name} />
                        <h3>{coffee.name}</h3>
                        <p>{coffee.description}</p>
                        <p><strong>${coffee.price}</strong></p>
                        <button onClick={() => addToCart(coffee)}>Добавить в корзину</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoffeeList;
