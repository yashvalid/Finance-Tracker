import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      <nav className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Personal Finance Tracker</h1>
          <div className="space-x-4">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#get-started" className="hover:underline">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="text-center py-20 bg-white shadow">
        <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances</h2>
        <p className="text-lg mb-6">
          Track your income, expenses, and savings effortlessly with our intuitive dashboard.
        </p>
        <Link to="/dashboard">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Go to Dashboard
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 text-center bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6">Features</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
            <h4 className="font-bold text-lg mb-2">Track Expenses</h4>
            <p>Easily log and categorize all your expenses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
            <h4 className="font-bold text-lg mb-2">Visual Reports</h4>
            <p>View monthly charts and gain financial insights.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
            <h4 className="font-bold text-lg mb-2">Secure & Private</h4>
            <p>Your data is stored securely and privately.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="text-center py-16 bg-blue-50">
        <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
           Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
