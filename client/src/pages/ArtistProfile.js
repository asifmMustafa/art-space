import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtworkCard from "../components/ArtworkCard";
import Header from "../components/Header";
import { useUserContext } from "../UserContext";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useLocation } from "react-router-dom";

const ArtistProfile = () => {
  const { id, is_artist } = useUserContext();

  const location = useLocation();

  const uploader = Uploader({
    apiKey: "public_kW15bah5uL38c9oxs7En75pFj8b8",
  });

  const [uploadText, setUploadText] = useState("Upload artwork picture...");

  const [artworks, setArtworks] = useState([]);
  const [artist, setArtist] = useState();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const getArtworks = (id) => {
    axios
      .post("http://localhost:4000/api/getMyArtworks", {
        id,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setArtworks(res.data.data);
        } else {
          alert(res.data.message);
        }
      });
  };

  const getArtist = (id) => {
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
  };

  useEffect(() => {
    if (is_artist) {
      getArtworks(id);
    } else {
      const artist_id = location.state.artist_id;
      getArtworks(artist_id);
      getArtist(artist_id);
    }
  }, []);

  const handleArtworkSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const date = `${day}/${month}/${year}`;

    const artwork = {
      title,
      category,
      price: "$" + price,
      description,
      date,
      imageURL,
      artist: id,
      approved: false,
    };

    axios.post("http://localhost:4000/api/addArtwork", artwork).then((res) => {
      if (res.data.status === "ok") {
        alert("ARTWORK SENT FOR APPROVAL.");
        getArtworks();

        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImageURL("");
        setUploadText("Upload artwork picture...");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="py-12 px-4">
        <div className="mx-auto">
          <div>
            {!is_artist && artist && (
              <>
                <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
                  Artist Information
                </h2>
                <div className="flex flex-row pt-4 ml-5">
                  <div className="h-64 border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      className="h-64 w-full object-cover"
                      src={artist.profilePictureURL}
                      alt={artist.name}
                    />
                  </div>
                  <div className="ml-5">
                    <div className="w-2/3 mb-4">Name: {artist.name}</div>
                    <div className="w-2/3 mb-4">Email: {artist.email}</div>
                    <div className="w-2/3 mb-4">Phone: {artist.phone}</div>
                    <div className="w-2/3 mb-4">Biography: {artist.bio}</div>
                  </div>
                </div>
              </>
            )}
            {is_artist && (
              <>
                <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
                  Add artwork
                </h2>
                <form
                  className="flex flex-col md:flex-row items-start justify-center mt-8 space-y-6 md:space-y-0 md:space-x-10 max-w-screen-lg mx-auto"
                  onSubmit={handleArtworkSubmit}
                >
                  <div className="rounded-md space-y-3 md:flex-1">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                      placeholder="Title"
                    />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                      placeholder="Price"
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none"
                      rows="2"
                      placeholder="Description"
                    />
                  </div>

                  <div className="rounded-md space-y-3 md:flex-1">
                    <select
                      value={category}
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-m"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Painting">Painting</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Photography">Photography</option>
                    </select>

                    <UploadButton
                      uploader={uploader}
                      options={{ multi: false }}
                      onComplete={(files) => {
                        if (files[0]) {
                          setImageURL(files[0].fileUrl);
                          setUploadText("Uploaded!");
                        }
                      }}
                      className="mt-3"
                    >
                      {({ onClick, onDragOver, onDragLeave, onDrop }) => (
                        <button
                          onClick={onClick}
                          onDragOver={onDragOver}
                          onDragLeave={onDragLeave}
                          onDrop={onDrop}
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
                        >
                          {uploadText}
                        </button>
                      )}
                    </UploadButton>

                    <button
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
            Artworks
          </h2>
          <div className="flex flex-row flex-wrap">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
