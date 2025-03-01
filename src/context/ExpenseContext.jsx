import axios from "axios";
import { createContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const API = "https://expensetracker-backend-ocei.onrender.com/expense";

  // 🔹 Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Ensure token is stored after login
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(API, { headers: getAuthHeaders() });
        setExpenses(res.data);
      } catch (error) {
        console.error(
          "Error fetching expenses:",
          error.response?.data || error.message
        );
      }
    };
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const res = await axios.post(API, expense, { headers: getAuthHeaders() });
      setExpenses([...expenses, res.data]);
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data || error.message
      );
    }
  };

  const editExpense = async (id, updatedExpense) => {
    try {
      const res = await axios.put(`${API}/${id}`, updatedExpense, {
        headers: getAuthHeaders(),
      });
      setExpenses(expenses.map((exp) => (exp._id === id ? res.data : exp)));
    } catch (error) {
      console.error(
        "Error editing expense:",
        error.response?.data || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { headers: getAuthHeaders() });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
