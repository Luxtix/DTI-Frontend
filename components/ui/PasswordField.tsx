import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-zinc-700">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="w-full border rounded-lg p-2 pr-10"
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiFillEyeInvisible size={25} />
          ) : (
            <AiFillEye size={25} />
          )}
        </span>
      </div>
    </div>
  );
}

export default PasswordField;
