# Rohlik Assignment

This project consists of a backend (Java/Spring Boot) and a frontend (Next.js/TypeScript) for user management.

## Prerequisites

- Node.js (v18+ recommended)
- Java 17+
- Maven

## Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Build and run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8090`.

## Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Run the frontend:
   ```sh
   yarn dev
   ```
   The frontend will start on `http://localhost:3000`.

## Usage

- Open `http://localhost:3000` in your browser to access the application.
- The frontend communicates with the backend API at `http://localhost:8090`.

## Testing

- Backend: Run `./mvnw test` in the `backend` folder.
- Frontend: Run `npm test` in the `frontend` folder.

## Notes

- Ensure both backend and frontend servers are running for full functionality.
- API endpoints and ports can be configured as needed.
