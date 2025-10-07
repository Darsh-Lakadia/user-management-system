# User Managmenet System

### Prerequisites
- **Node.js**: 18+ (with npm)

### Setup
```bash
cd /home/bacancy/projects/user-management-system
cp env.example .env
# Optional: update VITE_API_BASE_URL in .env if needed
npm install
```

### To Run the project
```bash
npm run dev
# Open http://localhost:5173
```

### Environment variables
- **.env** is loaded by Vite. Only variables prefixed with `VITE_` are exposed to the client.
- Defaults from `env.example`:
  - `VITE_API_BASE_URL=https://api.escuelajs.co/api/v1`
  - `VITE_APP_ENV=development`
