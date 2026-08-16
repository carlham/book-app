# Book App

A full-stack library management app built with the MERN stack and TypeScript.

This is a personal learning project focused on improving my TypeScript skills, backend architecture, and full-stack application patterns.

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Styling: SCSS

## Features

- Browse books with pagination
- View individual book details
- Add, update, and delete books
- Structured backend routing and controller/service separation
- Centralized error handling and validation middleware

## Project Structure

```bash
book-app/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── README.md
└── .gitignore
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/carlham/book-app
cd book-app
```

### 2. Install dependencies

Install dependencies for both the frontend and backend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Start the app

Run the backend and frontend in separate terminals:

```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

The frontend will run on the Vite development server, and the backend will run on the Express server.

## Backend Notes

The backend uses a layered structure with:

- routes
- controllers
- services
- models
- validation middleware
- centralized error handling