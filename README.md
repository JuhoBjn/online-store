# Goldenage

Goldenage is a full-stack, online activation service for the elderly, made for a course. The client for this project is a group of International Business students. Implementation of the project is done by a group of three software engineering students.

Software development team:

- Juho Björkman
- Valtteri Huuskonen
- Jyri Pappinen

## Development instructions

### Tools and Software needed

- NodeJS v20
- Docker
- Git
- MySQL CLI tools `mysql` and `mysqldump`[^1]

### Run commands

#### Backend

- `docker compose up -d` in the root of the project to run the database and database management console containers
- Navigate to the backend folder `cd backend`
- `cp .env.example .env` to create the environment variable file
  - Replace `JWT_KEY` with a string of your choosing
- `npm install` to install all necessary Node modules
- `npx dbmate up` to run all pending migrations to the database
- `npm run start` to run the backend
- `npm run dev` to start a development server with Nodemon

#### Frontend

- Navigate to the frontend folder `cd frontend`
- `cp .env.example .env` to create the environment variable file
- `npm install` to install all necessary Node modules
- `npm run dev` to start a local development server

### Run tests

#### Backend

- `npm run test` or `npm run test:clean` to run backend tests

#### Frontend

- `npm run test` or `npm run test:run` to run unit tests with Vitest
- `npm run test:e2e` to run end-to-end tests with Cypress

## Deployed website

The website is deployed on Render. The site is hosted on free-tier instances which shut down with inactiviy so the first signup or login will take a long time.

Frontend: [https://onlinestore-frontend-stg.onrender.com](https://onlinestore-frontend-stg.onrender.com)

Backend (healthcheck): [https://onlinestore-backend-stg.onrender.com/healthz](https://onlinestore-backend-stg.onrender.com/healthz)

[^1]: `mysql` is used as part of [inserting test data when running backend tests locally using `npm run test:clean`](backend/localtestrun.sh) and [`mysqldump` is used for exporting the database schema](https://github.com/amacneil/dbmate#exporting-schema-file).
