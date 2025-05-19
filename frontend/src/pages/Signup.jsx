import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState({
    firstname : "",
    lastname : ""
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      const user = {
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname
        },
        username,
        email,
        password
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,user);
      if(response.status === 200){
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess(null);
          navigate('/login');
        }, 2000);
      } else{
        setError(response.data.message || "Failed to register! Please try again.");
      }
    } catch(err){
      setError(err.response?.data?.message || err.message || "An error occurred");
      setTimeout(() => {
        setError(null)
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/2 hidden md:flex bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Join Us Today!</h1>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Sign Up</h2>
          {error && (
            <p className="mb-4 text-red-700 bg-red-100 border border-red-300 text-center rounded p-3">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-green-700 bg-green-100 border border-green-300 text-center rounded p-3">
              {success}
            </p>
          )}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={fullname.firstname}
                onChange={(e) =>
                  setFullname({ ...fullname, firstname: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={fullname.lastname}
                onChange={(e) =>
                  setFullname({ ...fullname, lastname: e.target.value })
                }
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-semibold shadow"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
