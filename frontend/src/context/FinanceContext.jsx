import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
export const FinanceContext = createContext(undefined);

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
