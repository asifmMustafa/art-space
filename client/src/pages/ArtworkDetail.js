import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";

const ArtworkDetail = () => {
  const location = useLocation();
  const artwork = location.state.artwork;

  const navigate = useNavigate();

  const { id, cart, setCart } = useUserContext();

  const [artistName, setArtistName] = useState("");
  const [zoomScale, setZoomScale] = useState(1); // initial scale of the image

  useEffect(() => {
    if (!id) {
      navigate("/");
    }

    axios
      .post("http://localhost:4000/api/getArtist", {
        id: artwork.artist,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setArtistName(res.data.data.name);
        } else {
          alert(res.data.message);
        }
      });
  }, []);

  const handleAddToCart = () => {
    if (cart.includes(artwork)) {
      alert("Artwork already in cart!");
    } else {
      setCart([...cart, artwork]);
      alert("Artwork added to cart!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex justify-center py-10">
        <div className="flex flex-row gap-12">
          <div className="rounded-lg overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src={artwork.imageURL}
              alt={artwork.title}
              style={{ transform: `scale(${zoomScale})` }} // scale the image
            />
          </div>
          <div className="max-w-sm">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              {artwork.category}
            </h2>
            <h1 className="title-font text-2xl font-medium text-gray-900 mb-3">
              {artwork.title}
            </h1>
            <h2 className="title-font text-lg font-medium text-gray-700 mb-3">
              Artist: {artistName}
            </h2>
            <h2 className="title-font text-lg font-medium text-gray-700 mb-5">
              Date added: {new Date(artwork.date).toLocaleDateString()}
            </h2>
            <p className="leading-relaxed mb-5">{artwork.description}</p>
            <p className="text-gray-600 items-center text-lg mb-5 justify-center">
              {artwork.price}
            </p>
            <div>
              <button
                className="mt-5 px-5 py-2 bg-blue-500 text-white border rounded-md hover:outline-none hover:bg-blue-400 text-lg"
                onClick={() => setZoomScale(zoomScale + 0.2)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </button>
              <button
                className="mt-5 px-5 py-2 bg-blue-500 text-white border rounded-md hover:outline-none hover:bg-blue-400 text-lg"
                onClick={() => setZoomScale(zoomScale - 0.2)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-5 px-5 py-2 bg-blue-500 text-white border rounded-md hover:outline-none hover:bg-blue-400 text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
