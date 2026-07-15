import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  name = "password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>

    </div>
  );
}

export default PasswordInput;