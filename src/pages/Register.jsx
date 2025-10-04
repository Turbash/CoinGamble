import { useState, useContext } from "react";
import { registerUser } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "collector",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(form);
      localStorage.setItem("token", data.token);
      login({ username: form.username, role: form.role }, data.token);
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="glass rounded-3xl p-10 max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Join Us</h2>
          <p className="text-gray-400 font-light">Create your collector account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold">Username</label>
            <input 
              name="username" 
              placeholder="Choose a username" 
              value={form.username}
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={form.email}
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Create a password" 
              value={form.password}
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold">Account Type</label>
            <select 
              name="role" 
              value={form.role}
              onChange={handleChange} 
              required
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white text-lg"
            >
              <option value="collector">Collector</option>
              <option value="expert">Expert Appraiser</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 font-light">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-gray-300 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;