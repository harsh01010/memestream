import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { AuthService } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [formData, setformData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(()=>{
    const checkForActiveSession = async ()=>{
      const user = await authService.getCurrentUser();
      console.log(user);
      if(user!=null)
      {
        navigate('home')
      }
    }
    checkForActiveSession();
  },[])

  const authService = new AuthService();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setLoading(true);

    try {
      const response = await authService.Login({ email: formData.email, password: formData.password });
      navigate("/home");
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl mx-auto mt-16 md:mt-20">
      <h2 className="text-3xl font-extrabold text-center text-black mb-6">
        Meme-Audio-Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 text-black rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 text-black rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-gray-500"
            placeholder="Enter your password"
            required
          />
          {formData.password && (
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-black cursor-pointer absolute top-10 right-3"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-500"} text-black font-bold rounded-lg shadow-md hover:bg-cyan-400 transition duration-200 transform hover:scale-105`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
