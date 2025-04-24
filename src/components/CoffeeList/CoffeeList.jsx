import React, { useState, useEffect } from 'react';
import './CoffeeList.css';
import CoffeeCard from "./CoffeeCard";

const CoffeeList = ({ addToCart }) => {
    const [coffeeList, setCoffeeList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/coffees.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCoffeeList(data);
            })
            .catch((error) => console.error('Error fetching coffee list:', error));
    }, []);

    return (
        <div className="coffee-section">
            <h2 className="section-title">Наши Кофе</h2>
            <div className="coffee-list">
                {coffeeList.length === 0 ? (
                    <p>Загрузка...</p>
                ) : (
                    coffeeList.map((coffee) => (
                        <CoffeeCard key={coffee.id} coffee={coffee} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CoffeeList;
