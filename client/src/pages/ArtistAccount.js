import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useUserContext } from "../UserContext";

function ArtistAccount() {
  const { id } = useUserContext();

  const [artist, setArtist] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getArtist", {
        id,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          console.log(res.data.data);
          setArtist(res.data.data);
        } else {
          alert(res.data.message);
        }
      });
  }, [id]);

  const update = () => {
    axios
      .post("http://localhost:4000/api/updateArtist", { ...artist })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("UPDATED SUCCESSFULLY!");
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <>
      {artist && (
        <div className="bg-gray-50 min-h-screen">
          <Header />
          <div className="flex flex-col items-center justify-center pt-10">
            <div className="h-64 border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                className="h-64 w-full object-cover"
                src={artist.profilePictureURL}
                alt={artist.name}
              />
            </div>
            <div className="w-2/3 mb-4">
              <input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                type="text"
                value={artist.name}
                onChange={(e) => {
                  setArtist((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-2/3 mb-4">
              <input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                type="text"
                value={artist.email}
                onChange={(e) => {
                  setArtist((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-2/3 mb-4">
              <input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                type="text"
                value={artist.phone}
                onChange={(e) => {
                  setArtist((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-2/3 mb-4">
              <textarea
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                value={artist.bio}
                onChange={(e) => {
                  setArtist((prevState) => ({
                    ...prevState,
                    bio: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className="w-64 flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={update}
            >
              Update
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default ArtistAccount;
