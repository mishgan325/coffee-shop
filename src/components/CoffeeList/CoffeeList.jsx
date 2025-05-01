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

    if (!token) {
        return <p className="text-center text-danger">Ошибка: пользователь не авторизован</p>;
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Наш кофе</h2>
            {loading ? (
                <p className="text-center">Загрузка...</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {coffeeList.length === 0 ? (
                        <p className="text-center">Нет кофе для отображения</p>
                    ) : (
                        coffeeList.map((coffee) => (
                            <div className="col" key={coffee.id}>
                                <CoffeeCard coffee={coffee} addToCart={addToCart} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CoffeeList;
