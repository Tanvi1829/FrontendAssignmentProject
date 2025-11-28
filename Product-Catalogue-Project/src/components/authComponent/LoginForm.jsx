import { LockKeyhole } from 'lucide-react'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'


const LoginForm = () => {
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

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
  setIsLoggedIn(true); // Update global auth state
  // Save current user identifier so we can persist per-user data
  if (typeof setCurrentUser === 'function') setCurrentUser(email);
  navigate("/catalogue")
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center px-4 py-8 md:py-0'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='flex flex-col items-center mb-8 md:mb-10'>
          <LockKeyhole className='bg-blue-950 p-2 text-white rounded-full mb-2 md:mb-4' size={40}/>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Sign in</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-5'>
          {/* Email Input */}
          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Email Address *"
              className={`border p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 text-sm md:text-base ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <input
              type="password"
              placeholder="Password *"
              className={`border p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 text-sm md:text-base ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</span>}
          </div>

          {/* Sign In Button */}
          <button 
            type='submit' 
            className='bg-blue-950 text-white p-2 md:p-3 rounded-md hover:bg-blue-900 transition font-medium text-sm md:text-base mt-2 md:mt-4'
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className='flex flex-col md:flex-row justify-center md:justify-center gap-4 md:gap-8 mt-6 md:mt-8'>
          <Link to="/" className='text-blue-950 hover:underline text-sm md:text-base text-center'>Forgot Password?</Link>
          <Link to="/" className='text-blue-950 hover:underline text-sm md:text-base text-center'>Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm