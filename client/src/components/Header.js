import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Header() {
  const navigate = useNavigate();

  const { setId, setIs_Artist, is_artist, isAdmin, setIsAdmin } =
    useUserContext();

  const logout = () => {
    setId("");
    setIs_Artist(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-50 px-6 py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-3xl font-bold text-gray-900 flex items-center cursor-pointer"
          onClick={() => {
            if (is_artist) {
              navigate("/artistProfile");
            } else if (isAdmin) {
              navigate("/admin");
            } else {
              navigate("/browse");
            }
          }}
        >
          <span>Art </span>
          <span className="text-blue-600">Space</span>
        </div>
        <div className="flex items-center">
          {!is_artist && !isAdmin && (
            <span
              onClick={() => {
                navigate("/cart");
              }}
              className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
            >
              Cart
            </span>
          )}
          {!is_artist && !isAdmin && (
            <span
              onClick={() => {
                navigate("/favorites");
              }}
              className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
            >
              Favorites
            </span>
          )}
          {is_artist && (
            <span
              onClick={() => {
                navigate("/artistAccount");
              }}
              className="text-lg text-blue-500 hover:text-blue-600 cursor-pointer mx-3"
            >
              Account
            </span>
          )}
          <span
            onClick={logout}
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
