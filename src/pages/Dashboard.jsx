import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseContext from "../context/ExpenseContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { expenses } = useContext(ExpenseContext);
  const [selectedExpense, setSelectedExpense] = useState(null);

  if (!user) {
    return <div>You are not logged in!! Please login.</div>;
  }

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full">
        <div className="p-6 w-full min-h-screen bg-gray-100">
          {/* Total Expenses Header */}
          <div className="mb-6 p-4 bg-blue-600 text-white text-2xl font-bold rounded-lg shadow-md text-center">
            💰 Total Expenses: ₹{totalAmount}
          </div>

          {/* Main Content: Form (Left) + Expense List (Right) */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Left Side - Expense Form */}
            <div className="w-full md:w-1/3 bg-white p-4 shadow-md rounded-lg">
              <ExpenseForm
                selectedExpense={selectedExpense}
                setSelectedExpense={setSelectedExpense}
              />
            </div>

            {/* Right Side - Expense List */}
            <div className="w-full md:w-2/3 bg-white p-4 shadow-md rounded-lg">
              <ExpenseList setSelectedExpense={setSelectedExpense} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
