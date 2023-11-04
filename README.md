# Online Store

Online store is a full-stack online store page made for a course. The client for this project is a group of International Business students. Implementation of the project is done by a group of four software engineering students.

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
- `npm install` to install all necessary Node modules
- `npx dbmate up` to run all pending migrations to the database
- `npm run start` to run the backend
- `npm run dev` to start a development server with Nodemon

### Run tests

#### Backend

- `npm run test` or `npm run test:clean` to run backend tests

[^1]: `mysql` is used as part of [inserting test data when running backend tests locally using `npm run test:clean`](backend/localtestrun.sh) and [`mysqldump` is used for exporting the database schema](https://github.com/amacneil/dbmate#exporting-schema-file).
