const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://nourish-me-yg2505s-projects.vercel.app",
  "https://nourish-koo9pydxh-yg2505s-projects.vercel.app",
  "https://nourish-me-git-main-yg2505s-projects.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if origin matches allowed origins or Vercel preview deployments
    const isAllowed = allowedOrigins.includes(origin) ||
      origin.match(/https:\/\/.*-yg2505s-projects\.vercel\.app$/);

    if (isAllowed) {
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
