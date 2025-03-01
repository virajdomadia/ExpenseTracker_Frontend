import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/"); // ✅ Redirect on success
    } catch (err) {
      setError(err || "Invalid login credentials");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        {/* ✅ Show error message */}
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className={`w-full bg-green-500 text-white p-2 rounded ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* ✅ Register Redirect */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
