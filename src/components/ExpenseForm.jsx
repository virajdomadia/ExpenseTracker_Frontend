import React, { useState, useContext, useEffect } from "react";
import ExpenseContext from "../context/ExpenseContext";

const ExpenseForm = ({ selectedExpense, setSelectedExpense }) => {
  const { addExpense, editExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    if (selectedExpense) {
      setFormData(selectedExpense);
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExpense) {
      editExpense(selectedExpense._id, formData);
    } else {
      addExpense(formData);
    }
    setFormData({ amount: "", category: "", date: "", notes: "" });
    setSelectedExpense(null);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-3">
        {selectedExpense ? "Edit Expense" : "Add Expense"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {selectedExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
