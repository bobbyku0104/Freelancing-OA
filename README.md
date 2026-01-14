# FreelanceHub - Freelance Platform with Hiring Logic

A modern freelance platform built with React, Express, MongoDB, and JWT authentication featuring a complete bidding system and atomic hiring operations.

## 🚀 Features

### Authentication
- User registration with password hashing (bcrypt)
- Login with JWT tokens stored in HttpOnly cookies
- Protected routes and authentication middleware

### Gig Management
- Create job postings with title, description, and budget
- Browse all open gigs with search functionality
- View detailed gig information
- Track gig status (open/assigned)

### Bidding System
- Freelancers can submit bids on open gigs
- Each bid includes a message and bid amount
- Prevent duplicate bids from same user
- Prevent users from bidding on own gigs

### Hiring Logic (Atomic Operations)
- Gig owners can view all bids on their gigs
- Click "Hire" button to select a freelancer
- **Atomic transaction ensures**:
  - Selected bid status → `hired`
  - Gig status → `assigned`
  - All other bids → `rejected`
  - All updates happen together or none at all

### Dashboards
- **My Gigs**: View all posted gigs and their status
- **My Bids**: Track all submitted bids and their status

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) - Must be running locally or provide connection URI
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Install MongoDB

**Windows:**
```bash
# Download MongoDB Community Server from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Follow official MongoDB installation guide for your distribution
# https://docs.mongodb.com/manual/administration/install-on-linux/
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/freelance-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=8000
NODE_ENV=development
```

### 3. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 4. Start the Applications

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:8000`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and set HttpOnly cookie |
| POST | `/api/auth/logout` | Clear authentication cookie |
| GET | `/api/auth/me` | Get current user info |

### Gigs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gigs` | Fetch all open gigs (with search query) |
| GET | `/api/gigs/:id` | Get single gig details |
| POST | `/api/gigs` | Create new job post (auth required) |
| GET | `/api/gigs/my-gigs` | Get user's posted gigs (auth required) |

### Bids
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bids` | Submit bid for a gig (auth required) |
| GET | `/api/bids/:gigId` | Get all bids for a gig (owner only) |
| GET | `/api/bids/my-bids/all` | Get user's submitted bids |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer (atomic operation) |

## 🎯 Usage Flow

### For Clients (Job Posters)

1. **Register/Login** to your account
2. **Post a Gig** - Navigate to "Post Gig" and fill in details
3. **View My Gigs** - See all your posted jobs
4. **Review Bids** - Click on a gig to see all received bids
5. **Hire Freelancer** - Click "Hire" button on the best bid

### For Freelancers

1. **Register/Login** to your account
2. **Browse Gigs** - Search and view available jobs
3. **Submit Bids** - Click on a gig and submit your proposal
4. **Track Bids** - View "My Bids" to see status of all proposals

## 🗄️ Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Gig Collection
```javascript
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId (ref: User),
  status: String (enum: ['open', 'assigned']),
  createdAt: Date,
  updatedAt: Date
}
```

### Bid Collection
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  message: String,
  bidAmount: Number,
  status: String (enum: ['pending', 'hired', 'rejected']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiration
- HttpOnly cookies prevent XSS attacks
- CORS configured for frontend origin
- Input validation with express-validator
- Authentication middleware on protected routes

## 🎨 Frontend Stack

- **React 19** with Hooks
- **React Router DOM** for navigation
- **TailwindCSS 4** for styling
- **Vite** for fast development

## 🔧 Backend Stack

- **Express 5** web framework
- **Mongoose** ODM for MongoDB
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoNetworkError: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8000
```
**Solution:** Change the PORT in `.env` file or stop the process using port 8000

### CORS Errors
**Solution:** Ensure the client is running on `http://localhost:5173` or update the CORS origin in `server/index.js`

## 📝 License

MIT

## 👨‍💻 Author

Built for Bobby's Assignment
