# Coffee Shop Telegram Mini App

Это Telegram Mini App (встроенное приложение), позволяющее пользователям заказывать кофе с добавками. Включает клиентскую часть на React и серверную часть на Spring Boot.

## 🔗 Демо

**Публичная ссылка:** [Открыть мини-приложение](https://t.me/coffeeshop325bot)

## 🛠️ Функциональность

### Пользовательская часть:
- Просмотр списка кофе и добавок.
- Добавление кофе в корзину.
- Выбор добавок к кофе.
- Оформление заказа.
- Просмотр истории заказов.
- Авторизация через Telegram `initData`.
### Админ-панель:
- Вход по паролю.
- Добавление и редактирование кофе и добавок.
- Просмотр всех заказов.

## 🧱 Технологии

### Frontend:
- **React** с использованием хуков.
- **Telegram WebApp API** для авторизации.
- **Bootstrap5** для стилизации.
- **React Router** для навигации.
## 🚀 Разворачивание

### Клонирование проекта

```bash
git clone https://github.com/mishgan325/coffee-shop.git
cd coffee-shop
```
### Создание .env

Создайте .env в корне проекта 
```
REACT_APP_API_URL=https://<ваш_ip_адрес или localhost>:<порт для бэкенда>
```
### Frontend

```bash
npm install
```

```bash
npm run start
```

> Для продакшена:

```bash
npm run build
```

Разместить в GitHub Pages (если уже настроено):

```bash
npm run deploy
```

> Убедитесь, что `homepage` в `package.json` указан как `/coffee-shop/`.

