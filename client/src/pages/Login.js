import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isArtist, setIsArtist] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isArtist) {
      axios
        .post("http://localhost:4000/api/loginArtist", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            alert(res.data.id);
          } else {
            alert(res.data.message);
          }
        });
    } else {
      axios
        .post("http://localhost:4000/api/loginUser", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            alert(res.data.id);
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">
            Art <span className="text-6xl font-bold text-blue-600">Space</span>
          </h1>
          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-md -space-y-px">
            <input
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Email address"
            />
            <input
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Password"
            />
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isArtist}
                onChange={() => setIsArtist(!isArtist)}
              />
              <span className="ml-2 text-lg">Are you an artist?</span>
            </label>
          </div>

          <div className="flex justify-center">
            <div className="text-lg">
              <p className="font-medium text-gray-900">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
