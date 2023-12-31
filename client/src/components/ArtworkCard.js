import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import axios from "axios";

const ArtworkCard = ({ artwork, isCart }) => {
  const navigate = useNavigate();

  const { id, is_artist } = useUserContext();

  const shortenString = (str) => {
    if (str.length > 145) {
      return str.slice(0, 145) + "...";
    } else {
      return str;
    }
  };

  const addToFavorites = () => {
    axios
      .post("http://localhost:4000/api/addToFavorites", {
        user_id: id,
        artwork_id: artwork._id,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Added to Favorites!");
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <div className="flex flex-row p-4 lg:w-1/3">
      <div className="w-1/2 h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover"
          src={artwork.imageURL}
          alt={artwork.title}
        />
      </div>
      <div className="w-1/2 p-3">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          {artwork.category}
        </h2>
        <h1
          className="title-font text-lg font-medium text-gray-900 mb-3 cursor-pointer hover:text-blue-600"
          onClick={() => {
            navigate("/artworkdetail", {
              state: {
                artwork: artwork,
              },
            });
          }}
        >
          {artwork.title}
        </h1>
        <p className="leading-relaxed mb-3">
          {shortenString(artwork.description)}
        </p>
        <div className="flex items-center justify-between flex-wrap">
          <span className="text-gray-600 inline-flex items-center text-sm py-1">
            <span className="text-gray-600 ml-1">{artwork.price}</span>
          </span>
          {!isCart && !is_artist && (
            <span className="text-gray-600 inline-flex items-center text-sm hover:text-blue-600">
              <button onClick={addToFavorites}>Add to Favorites</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
