# User Managmenet System

### Prerequisites
- **Node.js**: 18+ (with npm)

### Setup
```bash
cd user-management-system
cp env.example .env
# Optional: update VITE_API_BASE_URL in .env if needed
npm install
```

### To Run the project
```bash
npm run dev
# Open http://localhost:5173
```
## API endpoints used

### Auth
- POST `/auth/login` — login

### Users
- GET `/users` — list users
- POST `/users` — create user
- PUT `/users/:id` — update user by id
- DELETE `/users/:id` — delete user by id

## Assumptions

### Sample User Email & Password
- email: john@mail.com
- password: changeme


### Environment variables
- **.env** is loaded by Vite. Only variables prefixed with `VITE_` are exposed to the client.
- Defaults from `env.example`:
  - `VITE_API_BASE_URL=https://api.escuelajs.co/api/v1`
  - `VITE_APP_ENV=development`
