import { useState, useContext } from "react";
import { loginUser } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      login(data.user, data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (err) {
      toast.error(err.response?.data || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <ToastContainer />
      <input name="email" type="email" placeholder="Email" className="border p-2 rounded " onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" className="border p-2 rounded " onChange={handleChange} />
      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Login</button>
    </form>
  );
};

export default Login;