import React from 'react';
import ReactDOM from 'react-dom/client';  // Импортируем createRoot вместо render
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Создаем корень и рендерим приложение
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
