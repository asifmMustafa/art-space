import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-50 px-6 py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-900 flex items-center">
          <span>Art </span>
          <span className="text-blue-600">Space</span>
        </div>
        <div className="flex items-center">
          <span
            onClick={() => {
              navigate("/favorites");
            }}
            className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
          >
            Favorites
          </span>
          <span
            onClick={() => {
              navigate("/account");
            }}
            className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
          >
            Account
          </span>
          <span
            onClick={() => {
              navigate("/logout");
            }}
            className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
          >
            Logout
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
