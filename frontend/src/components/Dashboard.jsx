import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { ArrowUpIcon, ArrowDownIcon, IndianRupee, } from "lucide-react";
import { ExpenseSummary } from "./ExpenseSummary";
import TransactionBarChart from "./TransactionBarChart";

export const Dashboard = () => {
  const { balance, income, expenses, transactions } = useContext(FinanceContext);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Financial Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <IndianRupee className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-xl font-bold">₹{balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <ArrowUpIcon className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl font-bold">₹{income.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <ArrowDownIcon className="text-red-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-xl font-bold">₹{expenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <TransactionBarChart />
      <ExpenseSummary />
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            Recent Transactions
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {recentTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{transaction.Tname}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      transaction.transactionType === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.transactionType === "income" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-gray-500">No recent transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
};
