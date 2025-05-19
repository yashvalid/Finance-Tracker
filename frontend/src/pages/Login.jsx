import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const user = { username, password };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        user,
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.data.message || "Failed to login! Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-1/2 hidden md:flex bg-blue-700 items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Welcome Back!</h1>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white shadow-2xl">
        <div className="w-full max-w-md p-10 rounded-xl bg-white shadow-lg">
          {error && (
            <p className="mb-4 text-red-700 bg-red-100 border border-red-300 text-center rounded p-3 font-medium animate-shake">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-green-700 bg-green-100 border border-green-300 text-center rounded p-3 font-medium">
              {success}
            </p>
          )}
          <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition shadow"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
