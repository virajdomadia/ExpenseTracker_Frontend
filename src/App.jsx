import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ExpenseProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </ExpenseProvider>
      </AuthProvider>
    </>
  );
}

export default App;
