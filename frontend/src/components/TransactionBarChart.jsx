import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FinanceContext } from "../context/FinanceContext";

const getMonthYear = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}-${year}`;
};

const TransactionBarChart = () => {
    const { transactions } = React.useContext(FinanceContext);

    const monthlyData = transactions.reduce((acc, transaction) => {
        const monthYear = getMonthYear(transaction.date || new Date().toISOString());

        if (!acc[monthYear]) {
            acc[monthYear] = { month: monthYear, expense: 0 };
        }

        if (transaction.transactionType === "expense") {
            acc[monthYear].expense += transaction.amount;
        }

        return acc;
    }, {});

    const chartData = Object.values(monthlyData);

    chartData.sort((a, b) => {
        const [monthA, yearA] = a.month.split('-').map(Number);
        const [monthB, yearB] = b.month.split('-').map(Number);
        return yearA - yearB || monthA - monthB;
    });

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="expense"
                            fill="#EF4444"
                            maxBarSize={80}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TransactionBarChart;
