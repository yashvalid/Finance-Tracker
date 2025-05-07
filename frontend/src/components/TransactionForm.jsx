import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

export const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    Tname: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    transactionType: "expense",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categories = {
    income: ["Salary", "Freelance", "Investments", "Gifts", "Other"],
    expense: [
      "Housing",
      "Food",
      "Transportation",
      "Entertainment",
      "Healthcare",
      "Shopping",
      "Utilities",
      "Other",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Tname || !formData.amount || !formData.date || !formData.category) {
      setError("All fields are required");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    addTransaction({
      Tname: formData.Tname,
      amount: amount,
      date: formData.date,
      category: formData.category,
      transactionType: formData.transactionType,
    });

    setFormData({
      Tname: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      transactionType: "expense",
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Transaction</h2>
      <div className="bg-white rounded-lg shadow p-6">
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">Transaction added successfully!</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="transactionType" value="expense" checked={formData.transactionType === "expense"} onChange={handleChange} className="form-radio h-5 w-5 text-blue-600" />
                <span className="ml-2 text-gray-700">Expense</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="transactionType" value="income" checked={formData.transactionType === "income"} onChange={handleChange} className="form-radio h-5 w-5 text-blue-600" />
                <span className="ml-2 text-gray-700">Income</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Desciption</label>
            <input type="text" name="Tname" value={formData.Tname} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="e.g., Grocery shopping" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount (₹)</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" min="0.01" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select a category</option>
              {categories[formData.transactionType].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};
