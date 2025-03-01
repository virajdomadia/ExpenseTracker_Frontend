import React, { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import dayjs from "dayjs";

const ExpenseList = ({ setSelectedExpense }) => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  const formatDate = (isoDate) => dayjs(isoDate).format("DD-MM-YYYY");

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses recorded yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center transition hover:shadow-md hover:bg-gray-200"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{expense.amount} - {expense.category}
                </p>
                <p className="text-gray-600 text-sm">
                  📅 {formatDate(expense.date)} | 📝 {expense.notes}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedExpense(expense)}
                  className="px-3 py-1 text-sm font-medium text-yellow-600 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
