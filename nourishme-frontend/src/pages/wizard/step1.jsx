export default function Step1({ form, updateForm, next }) {
    return (
      <div>
        <h2 className="text-xl font-bold text-center mb-4">Tell us about yourself</h2>
  
        <label className="font-medium">Age</label>
        <input
          type="number"
          value={form.age}
          onChange={(e) => updateForm({ age: e.target.value })}
          className="w-full p-3 border rounded-xl mt-1 mb-4"
        />
  
        <label className="font-medium">Gender</label>
        <select
          value={form.gender}
          onChange={(e) => updateForm({ gender: e.target.value })}
          className="w-full p-3 border rounded-xl mt-1"
        >
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
  
        <button
          onClick={next}
          disabled={!form.age || !form.gender}
          className={`w-full mt-6 p-3 rounded-xl text-white
          ${!form.age || !form.gender ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
      </button>
      </div>
    );
  }
  