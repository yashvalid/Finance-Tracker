import React, { useState } from "react";
import { Dashboard } from "./Dashboard";
import { TransactionList } from "./TransactionList";
import { TransactionForm } from "./TransactionForm";
import { HomeIcon, ListIcon, PlusCircleIcon } from "lucide-react";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      </header>
      <main className="flex-grow p-4 md:p-6 container mx-auto max-w-4xl">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "transactions" && <TransactionList />}
        {activeTab === "add" && <TransactionForm />}
      </main>
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex flex-col items-center p-4 flex-1 ${
                activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <HomeIcon size={20} />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex flex-col items-center p-4 flex-1 ${
                activeTab === "transactions" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <ListIcon size={20} />
              <span className="text-xs mt-1">Transactions</span>
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex flex-col items-center p-4 flex-1 ${
                activeTab === "add" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <PlusCircleIcon size={20} />
              <span className="text-xs mt-1">Add New</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
