import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

function Admin() {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [pendingArtworks, setPendingArtworks] = useState([]);

  const getUsers = () => {
    axios.get("http://localhost:4000/api/getUsers").then((res) => {
      if (res.data.status === "ok") {
        console.log(res.data.data);
        setUsers(res.data.data);
      } else {
        alert(res.data.message);
      }
    });
  };

  const getArtists = () => {
    axios.get("http://localhost:4000/api/getArtists").then((res) => {
      if (res.data.status === "ok") {
        console.log(res.data.data);
        setArtists(res.data.data);
      } else {
        alert(res.data.message);
      }
    });
  };

  const getArtworks = () => {
    axios.get("http://localhost:4000/api/getArtworks").then((res) => {
      if (res.data.status === "ok") {
        console.log(res.data.data);
        let allArtworks = res.data.data;
        setArtworks(allArtworks.filter((artwork) => artwork.approved));
        setPendingArtworks(allArtworks.filter((artwork) => !artwork.approved));
      } else {
        alert(res.data.message);
      }
    });
  };

  const shortenString = (str) => {
    if (str.length > 145) {
      return str.slice(0, 145) + "...";
    } else {
      return str;
    }
  };

  const deleteArtist = (id) => {
    axios.post("http://localhost:4000/api/deleteArtist", { id }).then((res) => {
      if (res.data.status === "ok") {
        alert("DELETED ARTIST");
        getArtists();
      } else {
        alert(res.data.message);
      }
    });
  };

  const deleteUser = (id) => {
    axios.post("http://localhost:4000/api/deleteUser", { id }).then((res) => {
      if (res.data.status === "ok") {
        alert("DELETED USER");
        getArtists();
      } else {
        alert(res.data.message);
      }
    });
  };

  const deleteArtwork = (id) => {
    axios
      .post("http://localhost:4000/api/deleteArtwork", { id })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("DELETED ARTWORK");
          getArtworks();
        } else {
          alert(res.data.message);
        }
      });
  };

  const approveArtwork = (id) => {
    axios
      .post("http://localhost:4000/api/approveArtwork", { id })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("APPROVED ARTWORK");
          getArtworks();
        } else {
          alert(res.data.message);
        }
      });
  };

  useEffect(() => {
    getUsers();
    getArtists();
    getArtworks();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5 mt-2">
        Users count: {users.length}
      </h2>
      {users.map((user, idx) => (
        <div className="border p-4 m-2 rounded-md shadow">
          <h3 className="font-bold">{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button
            onClick={() => deleteUser(user._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
        Artists count: {artists.length}
      </h2>
      {artists.map((artist, idx) => (
        <div className="border p-4 m-2 rounded-md shadow">
          <div>
            <img
              src={artist.profilePictureURL}
              alt={artist.name}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <h3 className="font-bold">{artist.name}</h3>
          <p>Phone: {artist.phone}</p>
          <p>Email: {artist.email}</p>
          <button
            onClick={() => deleteArtist(artist._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
        Artworks count: {artworks.length}
      </h2>
      {artworks.map((artwork, idx) => (
        <div className="border p-4 m-2 rounded-md shadow">
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
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3 cursor-pointer hover:text-blue-600">
                {artwork.title}
              </h1>
              <p className="leading-relaxed mb-3">
                {shortenString(artwork.description)}
              </p>
              <div className="flex items-center justify-between flex-wrap">
                <span className="text-gray-600 inline-flex items-center text-sm py-1">
                  <span className="text-gray-600 ml-1">{artwork.price}</span>
                </span>
                <button
                  onClick={() => deleteArtwork(artwork._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h2 className="text-m title-font font-medium text-gray-500 mb-1 ml-5">
        Pending Artworks count: {pendingArtworks.length}
      </h2>
      {pendingArtworks.map((artwork, idx) => (
        <div className="border p-4 m-2 rounded-md shadow">
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
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3 cursor-pointer hover:text-blue-600">
                {artwork.title}
              </h1>
              <p className="leading-relaxed mb-3">
                {shortenString(artwork.description)}
              </p>
              <div className="flex items-center justify-between flex-wrap">
                <span className="text-gray-600 inline-flex items-center text-sm py-1">
                  <span className="text-gray-600 ml-1">{artwork.price}</span>
                </span>
                <button
                  onClick={() => approveArtwork(artwork._id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 ml-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteArtwork(artwork._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Admin;
