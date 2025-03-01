import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        💰 Expense Tracker
      </Link>

      {/* Links */}
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/" className="hover:text-gray-300">
              Dashboard
            </Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
