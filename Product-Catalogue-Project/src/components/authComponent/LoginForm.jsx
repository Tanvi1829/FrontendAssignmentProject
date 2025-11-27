import { LockKeyhole } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const LoginForm = () => {
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted:", { email, password });
      // API call yaha kar sakti ho
      navigate("/catalogue")
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-auto mt-40'>
        <div className='flex flex-col items-center'>
            <LockKeyhole className='bg-blue-950 p-2 text-white rounded-full' size={40}/>
            Sign in
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6 w-full max-w-sm'>
 <div className="flex flex-col w-full">
          <input
            type="email"
            placeholder="Email Address *"
            className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div className="flex flex-col w-full">
          <input
            type="password"
            placeholder="Password *"
            className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
        </div>

            <button type='submit' className='bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 transition'>Sign In</button>
        </form>
        <div className='flex justify-between gap-8'>
            <Link to="/" className='text-blue-950 underline hover:underline mt-4 inline-block'>Forgot Password?</Link>
            <Link to="/" className='text-blue-950 underline hover:underline mt-4 inline-block'>Dont have an account? Sign Up</Link>
        </div>
    </div>
  )
}

export default LoginForm