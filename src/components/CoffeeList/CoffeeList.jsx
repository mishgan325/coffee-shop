import React, { useState, useEffect } from 'react';
import CoffeeCard from './CoffeeCard';
import { fetchCoffees } from '../../api/api';

const CoffeeList = ({ addToCart, token }) => {
    const [coffeeList, setCoffeeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const loadCoffees = async () => {
            try {
                const data = await fetchCoffees(token);
                setCoffeeList(data);
            } catch (error) {
                console.error('[fetchCoffees] Ошибка загрузки кофе:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCoffees();
    }, [token]);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">☕ Наш кофе</h2>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="spinner-border text-primary" role="status" />
                    <span className="ms-3">Загружаем аромат...</span>
                </div>
            ) : coffeeList.length === 0 ? (
                <div className="text-center text-muted fs-5 mt-5">Нет доступного кофе 😞</div>
            ) : (
                <div className="row g-4">
                    {coffeeList.map((coffee) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={coffee.id || coffee.name}>
                            <CoffeeCard coffee={coffee} addToCart={addToCart} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoffeeList;
