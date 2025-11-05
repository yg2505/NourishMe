export default function AuthLayout({ title, children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-300 via-green-100 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/40"></div>
  
        <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10">
          <h2 className="text-4xl font-bold text-center text-emerald-700 drop-shadow-sm mb-8">
            {title}
          </h2>
          {children}
        </div>
      </div>
    );
  }
  