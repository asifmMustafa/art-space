import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ArtworkCard from "../components/ArtworkCard";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();

  const { id } = useUserContext();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let favArtworkIds = [];
    axios.post("http://localhost:4000/api/getUser", { id }).then((res) => {
      if (res.data.status === "ok") {
        favArtworkIds = res.data.data.favorites;
        favArtworkIds.map((id) => {
          axios
            .post("http://localhost:4000/api/getArtwork", { id })
            .then((res) => {
              if (res.data.status === "ok") {
                if (!favorites.includes(res.data.data)) {
                  setFavorites((prevState) => [...prevState, res.data.data]);
                }
              } else {
                alert(res.data.message);
              }
            });
        });
      } else {
        alert(res.data.message);
      }
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="py-12 px-4 flex-grow">
        <div className="flex flex-row flex-wrap">
          {favorites.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} isCart={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
