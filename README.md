# Logistics Platform

A full-stack logistics tracking application with a React frontend and Express backend.

## 📁 Project Structure

```
logistics-platform/
├── frontend/               # React application
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── ...
├── backend/                # Express API server
│   ├── package.json
│   ├── index.js
│   ├── .env
│   └── ...
├── package.json            # Root monorepo config
├── vercel.json             # Deployment config
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install all dependencies
npm install
```

### Development

#### Start Frontend (React)
```bash
npm run start:frontend
```
- Runs on: `http://localhost:3000`

#### Start Backend (Express)
```bash
npm run start:backend
```
- Runs on: `http://localhost:5001`

#### Start Both (Separate terminals)
```bash
# Terminal 1
npm run start:frontend

# Terminal 2
npm run start:backend
```

### Build

#### Build Frontend
```bash
npm run build:frontend
```

#### Build Backend
```bash
npm run build:backend
```

## 📚 Project Details

### Frontend
- **Framework**: React 19
- **Package Manager**: npm
- **Key Dependencies**: axios, react-scripts
- **Location**: `/frontend`

### Backend
- **Framework**: Express
- **Database**: MongoDB (local or Atlas)
- **Authentication**: JWT + bcrypt
- **Location**: `/backend`

## 🔧 Configuration

### Backend Environment Variables
Create `/backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/logistics
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
```

## 🌐 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### Shipments
- `POST /shipment` - Create shipment (authenticated)
- `GET /shipment/:id` - Get shipment details (authenticated)

## 📦 Technologies

**Frontend:**
- React
- Axios
- CSS3

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- CORS

## 🚢 Deployment

The project is configured for Vercel deployment using `vercel.json`.

## 📝 License

MIT
