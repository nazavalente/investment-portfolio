# Investment Portfolio Web Application

Investment Portfolio Web Application is a full-stack web application designed to help users manage and monitor their investment portfolio. The application provides features for managing assets, investment categories, transactions, financial targets, watchlists, and portfolio dashboard summaries.

This project was developed as a local full-stack web application using a separated frontend and backend architecture.

## Project Overview

The main purpose of this project is to provide a simple and structured platform for users to record investment assets, track transactions, monitor financial targets, and view portfolio-related summaries.

The system is divided into two main parts:

- **Frontend**: provides the user interface for interacting with the portfolio management system.
- **Backend**: provides RESTful API services for authentication, data management, and portfolio-related calculations.

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
- Profit and loss summary

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

### Local Development

- Frontend runs locally using Vite
- Backend runs locally using Express.js
- MySQL database is used as the local database
- Environment variables are managed using `.env` files

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
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Database Models

The backend uses Prisma ORM with MySQL. The main database models include:

- **User**: stores user account data.
- **Category**: stores investment asset categories.
- **Asset**: stores investment asset details.
- **Transaction**: stores buy and sell transaction records.
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

Deploys Prisma migrations when needed for production migration workflows.

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

## Local Development Notes

This project is currently intended to run in a local development environment. The frontend and backend run separately, while the backend connects to a local MySQL database through environment variables.

Local application URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

## Project Team and Contribution

This project was developed as a full-stack investment portfolio web application using a separated frontend and backend architecture. The system provides features for managing investment assets, categories, transactions, financial targets, watchlists, dashboard summaries, authentication, and database integration.

### Team Members

* **Nazario Jose Valente da Cruz**
  Role: Full-Stack Developer
  Contribution: Designed and developed the main frontend and backend structure, implemented portfolio management features, integrated frontend functionality with backend REST API services, organized backend routes and database models, configured Prisma ORM with MySQL, implemented JWT-based authentication, and prepared the project documentation.

* **Mohamed Ali Ibrahim Gadelkarim**
  Role: Project Support and Documentation Reviewer
  Contribution: Assisted in reviewing project requirements, checking the application flow, testing the main features, giving feedback on user interface consistency, and supporting documentation review.

## What We Learned

Through this project, we strengthened our understanding of:

* Full-stack web application development
* Frontend and backend separation
* REST API integration
* Authentication using JWT
* Database modeling with Prisma ORM
* MySQL database connection
* Portfolio-related data management
* Local full-stack development setup using separate frontend, backend, and database environments
* Project organization for a scalable web application
* Application flow review and documentation improvement

## Future Improvements

Several improvements can be made in future development, including:

* Improving dashboard visualization and portfolio analytics
* Adding real-time market price integration
* Adding investment return calculation
* Improving user interface consistency
* Adding more validation and error handling
* Adding unit and integration testing
* Improving security and role-based access control
* Adding export features for transaction history and portfolio reports
* Preparing deployment configuration if the project is developed further in the future

## Authors

* Nazario Jose Valente da Cruz
  Informatics Student
  Telkom University

* Mohamed Ali Ibrahim Gadelkarim
  Informatics Student
  Telkom University


This repository contains the frontend, backend, database schema, and documentation for the Investment Portfolio Web Application.
