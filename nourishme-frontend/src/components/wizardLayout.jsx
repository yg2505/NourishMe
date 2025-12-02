// src/components/WizardLayout.jsx
export default function WizardLayout({ title, step, totalSteps, children, back }) {
    return (
      <div className="min-h-screen w-full bg-light-gradient  flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white/85 backdrop-blur-xl shadow-xl rounded-3xl p-8 animate-fadeIn border border-white/40">
          
          {/* Step Progress */}
          {step && totalSteps && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 font-medium mb-2">
                <span>Step {step} of {totalSteps}</span>
              </div>
  
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#159957] transition-all"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
  
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-[#159957] mb-6">
            {title}
          </h1>
  
          {/* Step form fields */}
          {children}
  
          {/* Back button */}
          {back && (
            <button
              onClick={back}
              className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    );
  }
  