import { useState, useContext } from "react";
import { registerUser } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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
    try {
      const data = await registerUser(form);
      localStorage.setItem("token", data.token);
      login({ username: form.username, role: form.role }, data.token);
      toast.success("Registration successful!");
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
      <input name="username" placeholder="Username" className="border p-2 rounded " onChange={handleChange} required/>
      <input name="email" type="email" placeholder="Email" className="border p-2 rounded " onChange={handleChange} required/>
      <input name="password" type="password" placeholder="Password" className="border p-2 rounded " onChange={handleChange} required/>
      <select name="role" className="border p-2 rounded " onChange={handleChange} required>
        <option value="collector">Collector</option>
        <option value="expert">Expert</option>
      </select>
      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Register</button>
    </form>
  );
};

export default Register;