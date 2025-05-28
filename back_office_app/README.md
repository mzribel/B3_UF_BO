# Cat Management System Frontend

This is a Vue 3 TypeScript frontend application for managing cats and users. It communicates with the Java backend API.

## Features

- View and manage cats
- View users
- Register new users
- Clean and responsive UI

## Project Structure

- `src/router/` - Vue Router configuration
- `src/services/` - API services for backend communication
- `src/views/` - Vue components for different pages
- `src/components/` - Reusable Vue components

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Backend Communication

The frontend communicates with the backend API using Axios. The API service is configured in `src/services/api.ts`.

Make sure the backend server is running on http://localhost:8080 (or update the baseURL in the API service if it's running on a different port).

## Technologies Used

- Vue 3
- TypeScript
- Vue Router
- Pinia (State Management)
- Axios (HTTP Client)
- Vite (Build Tool)