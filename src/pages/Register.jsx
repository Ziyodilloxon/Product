// react imports
import { useRef } from "react";

// axios
import axiosClient from "../utils/axios";

// slices
import { login as loginAction } from "../features/userSlice";

// react redux
import { useDispatch } from "react-redux";

// rrd imports
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const login = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/auth/register", {
        username: login.current.value,
        password: password.current.value,
      })
      .then((data) => dispatch(loginAction(data.data)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              ref={login}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              ref={password}
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out">
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
           Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
