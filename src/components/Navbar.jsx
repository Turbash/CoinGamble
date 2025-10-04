import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black border-b border-gray-800 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-200">
            CoinCollector
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            {user && user.role === "collector" && (
              <Link to="/collector" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                My Collection
              </Link>
            )}
            {user && user.role === "expert" && (
              <Link to="/expert" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                Expert Panel
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-gray-400 hover:text-white border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 font-medium">Welcome, {user.username}</span>
                <button 
                  onClick={logout}
                  className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {user && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-800 pt-4">
            {user.role === "collector" && (
              <Link to="/collector" className="block text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                My Collection
              </Link>
            )}
            {user.role === "expert" && (
              <Link to="/expert" className="block text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                Expert Panel
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
