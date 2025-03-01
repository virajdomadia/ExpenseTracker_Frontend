import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = "https://expensetracker-backend-ocei.onrender.com/auth";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post(`${API}/register`, formData);
      alert("Registered Successfully! Please login to continue.");
      navigate("/login"); // ✅ Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        {/* ✅ Show error message */}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* ✅ Already have an account? Redirect to Login */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
