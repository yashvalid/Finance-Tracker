import React, { act, useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Pencil, SearchIcon, Trash2 } from "lucide-react";
import axios from "axios";


export const TransactionList = () => {
  const { transactions, deleteTransaction, setTransactions } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    Tname: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    transactionType: "expense",
  });

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

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.Tname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const updateTransaction = async (_id) => {
    try {
      
      console.log("data to update",formData)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaction/update`, {...formData, _id},);
      if (response.status === 200) {
        setTransactions(transactions.map((transaction) => {
          if (transaction._id === response.data.result._id) {
        return { ...transaction, ...response.data.result };
          }
          return transaction;
        }));
        setSuccess(true);
        console.log("Transaction updated successfully!");
      }
      setTimeout(() => {
        setSuccess(false);
      },3000);
    } catch (err) {
      setError(`Error updating transaction!`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Transaction History
      </h2>
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">Transaction added successfully!</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {sortedTransactions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {sortedTransactions.map((transaction, idx) => (
              <div key={transaction._id}>
                <div
                  key={transaction._id}
                  className="p-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{transaction.Tname}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${transaction.transactionType === "income"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {transaction.transactionType === "income" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                    <button
                      className="text-gray-400 hover:text-red-500 transition p-3"
                      aria-label="Delete transaction"
                      onClick={() => deleteTransaction(transaction._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-500 transition"
                      aria-label="Delete transaction"
                      onClick={() => setActiveIndex(idx)}
                    >
                      <Pencil size={20} />
                    </button>
                  </p>
                </div>
                {activeIndex === idx && <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      setActiveIndex(null);
                    }}
                    className="p-4 bg-gray-100 rounded-lg shadow-inner"
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Transaction Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={transaction.Tname}
                        onChange={handleChange}
                        name="Tname"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={transaction.amount}
                        onChange={handleChange}
                        name="amount"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a category</option>
                        {categories[formData.transactionType].map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>

                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={new Date(transaction.date).toISOString().split("T")[0]}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={() => setActiveIndex(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => updateTransaction(transaction._id)}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>}
              </div>
            ))}
          </div>
        ) : (
          <p className="p-6 text-center text-gray-500">
            {searchTerm
              ? "No transactions match your search."
              : "No transactions yet."}
          </p>
        )}
      </div>
    </div>
  );
};
