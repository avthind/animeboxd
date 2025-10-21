# AnimeBoxd 🎬

A full-stack web application for tracking and discovering anime, built with React and Node.js.

## 📋 Features

- User authentication (Register/Login)
- Browse popular and new anime
- Search anime by title
- Personal watchlist management
- Anime details and ratings
- Responsive design with Tailwind CSS and DaisyUI

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library

### Backend
- **Node.js** & **Express** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/animeboxd.git
   cd animeboxd
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=9000
   NODE_ENV=development
   ```

3. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:9000/api
   ```

### Running Locally

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The API will run on `http://localhost:9000`

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## 📦 Building for Production

### Frontend
```bash
cd client
npm run build
```
This creates an optimized production build in the `dist/` directory.

### Backend
```bash
cd server
npm start
```

## 🌐 Deployment

### AWS Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to AWS.

**Quick Overview:**
- Backend: Deploy on AWS EC2 or Elastic Beanstalk
- Frontend: Deploy on AWS S3 + CloudFront or Amplify
- Database: Use MongoDB Atlas or AWS DocumentDB

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Anime
- `GET /api/anime/popular` - Get popular anime
- `GET /api/anime/new` - Get new anime
- `GET /api/anime/search?q=query` - Search anime
- `GET /api/anime/:id` - Get anime details

### Watchlist
- `GET /api/watchlist` - Get user's watchlist (protected)
- `POST /api/watchlist` - Add anime to watchlist (protected)
- `DELETE /api/watchlist/:animeId` - Remove from watchlist (protected)

## 🔐 Environment Variables

### Server
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/animeboxd` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `PORT` | Server port | `9000` |
| `NODE_ENV` | Environment | `development` or `production` |

### Client
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:9000/api` |

## 📂 Project Structure

```
animeboxd/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Entry point
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Your Name - [@your_github](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Anime data from [Jikan API](https://jikan.moe/)
- Icons and UI components from DaisyUI
- Built with React and Express

