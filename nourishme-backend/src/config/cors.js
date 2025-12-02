const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "nourish-me-yg2505s-projects.vercel.app",
    "https://nourish-koo9pydxh-yg2505s-projects.vercel.app/",
    "https://nourish-me-git-main-yg2505s-projects.vercel.app/"
  ];
  
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
