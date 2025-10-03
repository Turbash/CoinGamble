import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between px-6 py-3 items-center border-b border-gray-300">
      <h1 className="text-2xl font-bold">CoinGamble</h1>
      <div className="flex gap-20 px-4 justify-center items-center">
      <Link to="/" className="hover:text-gray-700">Home</Link>
      {!user && (
        <div className="flex gap-4 items-center">
          <Link className="rounded px-4 py-2 hover:bg-gray-100 border border-2 border-gray-700" to="/login">Login</Link>
          <Link className="rounded bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 border-2 border-gray-800" to="/register">Register</Link>
        </div>
      )}
      {user && user.role === "collector" && <Link className="hover:text-gray-700" to="/collector">My Coins</Link>}
      {user && user.role === "expert" && <Link className="hover:text-gray-700" to="/expert">Expert Dashboard</Link>}
      {user && <button className="bg-red-800 text-white px-4 py-2 rounded border border-red-800 hover:bg-red-900" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
