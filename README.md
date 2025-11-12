# NourishMe 🍎

 An AI-Powered Nutrition & Meal Planning Assistant that helps users build healthy eating habits with personalized, AI-generated meal plans, intelligent recipe suggestions, and comprehensive nutrition insights — all in one beautiful, responsive platform.

## 🌟 Features

 - **AI Meal Planner**         
 - **AI Recipe Builder**         
 - **User Authentication**       
 - **Meal & Recipe Management**  
 - **Search, Sort & Filter**     
 - **Pagination & Performance** 
 - **Responsive Design**                                            |
 - **Analytics Dashboard**  
 - **Privacy First**                                            

## 🛠️ Tech Stack

### Frontend

-  **React** – UI framework
-  **React Router** – Client-side routing
-  **Tailwind CSS** – Modern, utility-first CSS
-  **Axios** – For API communication
-  **React Context API** – Global state management
-  **React Hooks (useMemo/useCallback)** – Performance optimization

### Backend

-  **Node.js** – Runtime environment
-  **Express** – Web framework
-  **Prisma ORM** – Database management
-  **MySQL** – Relational database
-  **JWT (jsonwebtoken)** – Authentication
-  **bcryptjs** – Password hashing
-  **CORS** – Cross-origin resource handling
-  **dotenv** – Environment configuration

## 📁 Project Structure

```
NourishMe/
├── 📁 nourishme-frontend/                        # React frontend
│   ├── 📁 src/
│   │   ├── 📁 pages/                 # App pages
│   │   │   ├── 📄 Dashboard.js       # Nutrition dashboard
│   │   │   ├── 📄 Login.js           # Login page
│   │   │   ├── 📄 Signup.js          # Signup page
│   │   │   ├── 📄 MealPlans.js       # AI-generated meal plans
│   │   │   └── 📄 Recipes.js         # Recipe list & details
│   │   ├── 📁 components/            # Reusable UI components
│   │   ├── 📁 contexts/              # React Contexts
│   │   ├── 📁 hooks/                 # Custom hooks
│   │   ├── 📁 services/              # API calls & helpers
│   │   ├── 📁 utils/                 # Utilities (api.js, helpers)
│   │   ├── 📄 App.js                 # Root component
│   │   └── 📄 index.js               # React entry point
│   ├── 📁 public/
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   └── 📄 package.json
│
├── 📁 nourishme-backend/                        # Express backend
│   ├── 📄 index.js                   # Main server file
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma          # Prisma schema definition
│   │   └── 📄 client.js              # Prisma client instance
│   ├── 📁 routes/                    # Route handlers
│   ├── 📁 controllers/               # Business logic
│   ├── 📁 middlewares/               # Auth & validation middleware
│   ├── 📁 utils/                     # Helper functions
│   ├── 📄 package.json
│   └── 📄 .env                       # Environment variables
│
├── 📄 package.json
└── 📄 README.md
```

## 🚀 Getting Started

### Prerequisites

-  Node.js (v14 or higher)
-  npm or yarn
-  MySQL database
-  Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yg2505/NourishMe.git
   cd NourishMe
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Setup Backend**

   ```bash
   cd nourishme-backend
   npm install
   ```

   Create a `.env` file inside the `server/` directory:

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/nourishme_db"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   PORT=5000
   ```

   Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Setup Frontend**

   ```bash
   cd ../nourishme-frontend
   npm install
   ```

   Create a `.env` file inside the `client/` directory (if needed):

   ```env
   REACT_APP_API_URL="http://localhost:5000"
   ```

### Running the Application

1. **Start the backend**

   ```bash
   cd nourishme-backend
   npm start
   ```

   Server will run on [http://localhost:5000](http://localhost:5000)

2. **Start the frontend**
   ```bash
   cd nourishme-frontend
   npm start
   ```
   App will open at [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Signup

-  User registers with name, email, and password
-  Password is hashed using bcryptjs
-  User stored in MySQL via Prisma ORM
-  JWT token generated and returned
-  Token and user info saved in localStorage

###  Login

-  User logs in with credentials
-  Backend validates against hashed password
-  JWT token generated and sent back
-  Token stored in localStorage

###  Protected API Requests

-  Token attached to every request via Authorization header
-  Backend validates JWT for access control
-  Expired/invalid tokens trigger re-login

###  Logout

-  LocalStorage cleared → user redirected to login

## 📊 Database Schema 

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```


## 🔌 API Endpoints

### Auth

- **📝 POST /api/auth/signup** → Register new user
- **🔑 POST /api/auth/login** → Authenticate user


## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based stateless authentication
- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ Input validation
- ✅ Encrypted database storage

## 🐛 Troubleshooting

### "Database connection failed"

-  Ensure MySQL is running
-  Verify DATABASE_URL in .env
-  Run: `npx prisma migrate dev`

### "JWT_SECRET not set"

-  Add a strong JWT secret in .env

### "CORS error"

-  Ensure frontend origin matches backend

### "Token not stored after login"

-  Check browser → Application → LocalStorage

## 📦 Build & Deployment

### Build Frontend

```bash
cd client
npm run build
```

Output in `client/build/`

### Deployment Options

- **Frontend**: Vercel, Netlify, Render
- **Backend**: Railway, Render, AWS, DigitalOcean
- **Database**: Aiven MySQL, AWS RDS, PlanetScale

## 🤝 Contributing

1.  Fork the repository
2.  Create a new branch (`git checkout -b feature/awesome-feature`)
3.  Commit your changes (`git commit -m 'Add awesome feature'`)
4.  Push your branch (`git push origin feature/awesome-feature`)
5.  Open a Pull Request

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yashvi Goyal**

[![GitHub](https://img.shields.io/badge/GitHub-%40yg2505-black)](https://github.com/yg2505)

## 🙏 Acknowledgments

-  React community for amazing documentation
-  Prisma for seamless database management
-  Tailwind CSS for beautiful styling

---

<div align="center">

**NourishMe** — Eat smart, live better. 🍽️

</div>
