import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
export const FinanceContext = createContext(undefined);

// // Sample initial data
// const initialTransactions = [
//   {
//     id: "1",
//     Tname: "Salary",
//     amount: 3000,
//     date: "2023-06-01",
//     category: "Income",
//     transactionType: "income",
//   },
//   {
//     id: "2",
//     Tname: "Rent",
//     amount: 1200,
//     date: "2023-06-03",
//     category: "Housing",
//     transactionType: "expense",
//   },
//   {
//     id: "3",
//     Tname: "Groceries",
//     amount: 150,
//     date: "2023-06-05",
//     category: "Food",
//     transactionType: "expense",
//   },
//   {
//     id: "4",
//     Tname: "Freelance Work",
//     amount: 500,
//     date: "2023-06-10",
//     category: "Income",
//     transactionType: "income",
//   },
//   {
//     id: "5",
//     Tname: "Restaurant",
//     amount: 75,
//     date: "2023-06-12",
//     category: "Food",
//     transactionType: "expense",
//   },
// ];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/transaction/all`, {withCredentials : true});
        if (response.status === 200)
          setTransactions(response.data.allTransactions);
        console.log("Fetched transactions:", response.data.allTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    }
    fetchTransactions();
  }, [])

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaction/add`, transaction);
      if (response.status === 200)
        setTransactions([...(transactions || []), response.data.transaction]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const deleteTransaction = async (_id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaction/delete`, { _id });
      if (response.status === 200) {
        setTransactions((transactions || []).filter((transaction) => transaction._id !== _id));
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };


  const income = (transactions || [])
    .filter((t) => t.transactionType === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = (transactions || [])
    .filter((t) => t.transactionType === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        setTransactions,
        balance,
        income,
        expenses,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
