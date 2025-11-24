# Fullstack Web Application

Modern fullstack web application with React frontend and Express.js backend, featuring user authentication, product management, and admin dashboard.

## 🏗️ Project Structure

```
fullstack-app/
├── ExpressServer/          # Backend API (Node.js + Express)
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── ReactApp/             # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── apis/         # API calls
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # State management
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
└── package.json          # Root package.json
```

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Two-factor authentication (2FA)
  - Google OAuth integration

- **Product Management**
  - CRUD operations for products
  - Image upload with Cloudinary
  - Pagination and search
  - Stock management

- **User Management**
  - User registration and login
  - Profile management
  - Password reset functionality
  - Admin user management

- **Dashboard & Analytics**
  - Interactive charts and statistics
  - Real-time data visualization
  - Responsive design

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Radix UI** - Component library
- **React Query** - Data fetching
- **Zustand** - State management
- **React Router** - Navigation
- **Recharts** - Data visualization

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🔧 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd fullstack-app-main
```

### Step 2: Install Root Dependencies

```bash
npm install
```

### Step 3: Backend Setup

1. **Navigate to ExpressServer directory:**
```bash
cd ExpressServer
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create or update `.env` file:
```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/mydb
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (for 2FA)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

4. **Start MongoDB:**
- **Local MongoDB:** Make sure MongoDB service is running
- **MongoDB Atlas:** Use your Atlas connection string in MONGO_URL

### Step 4: Frontend Setup

1. **Navigate to ReactApp directory:**
```bash
cd ../ReactApp
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create or update `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Step 5: Database Setup

1. **Start MongoDB** (if using local installation):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

2. **Create database and collections:**
The application will automatically create the database and collections when you first run it.

## 🚀 Running the Application

### Option 1: Run Both Services Simultaneously (Recommended)

From the root directory:
```bash
npm start
```

This will start both backend (port 8000) and frontend (port 5173) concurrently.

### Option 2: Run Services Separately

**Terminal 1 - Backend:**
```bash
cd ExpressServer
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ReactApp
npm run dev
```

## 🌐 Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/api

## 📱 Default Login Credentials

After setting up the database, you can create an admin user or use the registration feature.

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/send-2fa` - Send 2FA code
- `POST /api/auth/verify-2fa` - Verify 2FA code

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get products (with pagination)
- `PUT /api/products/:id` - Update product

### Upload
- `POST /api/upload` - Upload images

## 🧪 Development Commands

### Backend
```bash
cd ExpressServer
npm run dev      # Start with nodemon
npm start        # Start production
```

### Frontend
```bash
cd ReactApp
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 📦 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, AWS, etc.)
3. Ensure MongoDB connection is configured for production

### Frontend Deployment
1. Update `VITE_API_BASE_URL` to your production API URL
2. Build the application:
```bash
cd ReactApp
npm run build
```
3. Deploy the `dist` folder to your hosting platform

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Role-based access control
- Secure file upload handling

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use:**
   - Change PORT in backend `.env`
   - Kill existing processes on ports 8000/5173

3. **CORS Errors:**
   - Verify frontend URL in backend CORS configuration
   - Check API base URL in frontend `.env`

4. **Image Upload Issues:**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper file formats

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please create an issue in the repository.