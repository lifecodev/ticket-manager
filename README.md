# Ticket Manager

Ticket Manager — desktop-приложение на Wails (Go + React + TypeScript) для ведения заявок.

## Что умеет

- регистрация и вход пользователя;
- хранение данных в SQLite (`app.db`);
- создание заявок (тема + описание);
- просмотр списка заявок;
- смена статуса заявки (`open`, `in_progress`, `closed`);
- выход из аккаунта.

## Технологии

- Backend: Go, Wails v2, GORM, SQLite;
- Frontend: React, TypeScript, Vite, TanStack Query.

## Запуск в режиме разработки

1. Установите зависимости фронтенда:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
2. Запустите приложение:
   ```bash
   wails dev
   ```

## Сборка

```bash
wails build
```
