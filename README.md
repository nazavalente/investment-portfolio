# Investment Portfolio Web Application

Investment Portfolio Web Application is a full-stack web application designed to help users manage and monitor their investment portfolio. The application provides features for managing assets, categories, transactions, financial targets, watchlists, and portfolio dashboard summaries.

This project was developed as a web-based portfolio management system using a separate frontend and backend architecture.

## Project Overview

The main purpose of this project is to provide a simple and structured platform for users to record investment assets, track transactions, monitor financial targets, and view portfolio-related summaries.

The system is divided into two main parts:

- **Frontend**: user interface for interacting with the portfolio management system.
- **Backend**: RESTful API for authentication, data management, and portfolio calculations.

## Features

The application includes the following main features:

- User registration and login
- JWT-based authentication
- Asset management
- Investment category management
- Transaction management
- Financial target tracking
- Watchlist management
- Dashboard summary
- Portfolio allocation overview
- Portfolio performance data
- Profit/loss summary

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

### Backend

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

### Deployment Configuration

- Vercel for frontend deployment
- Render for backend deployment
- MySQL database connection through environment variables

## Project Structure

```text
investment-portfolio/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── render.yaml
├── .gitignore
└── README.md
```

## Database Models

The backend uses Prisma ORM with MySQL. The main database models include:

- **User**: stores user account data.
- **Category**: stores investment asset categories.
- **Asset**: stores investment asset details.
- **Transaction**: stores buy/sell transaction records.
- **FinancialTarget**: stores user financial goals.
- **Watchlist**: stores assets that users want to monitor.

## API Overview

The backend provides REST API routes for:

```text
/api/auth
/api/assets
/api/categories
/api/transactions
/api/targets
/api/watchlist
/api/dashboard
```

Main dashboard endpoints include:

```text
/api/dashboard/summary
/api/dashboard/allocation
/api/dashboard/performance
/api/dashboard/profit-loss
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL
- Git

## Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/nazavalente/investment-portfolio.git
```

2. Open the backend folder:

```bash
cd investment-portfolio/backend
```

3. Install backend dependencies:

```bash
npm install
```

4. Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
FRONTEND_URL="http://localhost:5173"
PORT=5000
```

5. Generate Prisma Client:

```bash
npm run prisma:generate
```

6. Run database migration:

```bash
npm run prisma:migrate
```

7. Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## Frontend Setup

1. Open the frontend folder:

```bash
cd investment-portfolio/frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Environment Variables

### Backend `.env`

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
FRONTEND_URL="http://localhost:5173"
PORT=5000
```

Do not upload the real `.env` file to GitHub. Use `.env.example` to show the required environment variables.

## Available Scripts

### Backend

```bash
npm run dev
```

Runs the backend server using nodemon.

```bash
npm start
```

Runs the backend server using Node.js.

```bash
npm run prisma:generate
```

Generates Prisma Client.

```bash
npm run prisma:migrate
```

Runs Prisma migration in development.

```bash
npm run prisma:deploy
```

Deploys Prisma migrations for production.

### Frontend

```bash
npm run dev
```

Runs the frontend development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

## Deployment

This project is structured to support deployment using:

- **Vercel** for the frontend
- **Render** for the backend

The backend deployment configuration is included in:

```text
render.yaml
```

The backend uses `/health` as the health check endpoint.

## My Contribution

In this project, I worked on building a full-stack investment portfolio web application with a separated frontend and backend structure. My work involved developing user-facing portfolio management features, integrating frontend functionality with backend API services, organizing backend routes and database models, and preparing the project structure for deployment.

## What I Learned

Through this project, I strengthened my understanding of:

- Full-stack web application development
- Frontend and backend separation
- REST API integration
- Authentication using JWT
- Database modeling with Prisma ORM
- MySQL database connection
- Portfolio-related data management
- Deployment preparation using Vercel and Render
- Project organization for a scalable web application

## Future Improvements

Several improvements can be made in future development, including:

- Improving dashboard visualization and portfolio analytics
- Adding real-time market price integration
- Adding investment return calculation
- Improving user interface consistency
- Adding more validation and error handling
- Adding unit and integration testing
- Improving security and role-based access control
- Adding export features for transaction history and portfolio reports

## Author

Nazario Jose Valente da Cruz  
Informatics Student  
Telkom University

## Repository

This repository contains the frontend, backend, database schema, and deployment configuration for the Investment Portfolio Web Application.
