import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ArtworkCard from "../components/ArtworkCard";

const BrowseArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("price");

  useEffect(() => {
    axios.get("http://localhost:4000/api/getArtworks").then((res) => {
      if (res.data.status === "ok") {
        setArtworks(res.data.data);
      } else {
        alert(res.data.message);
      }
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  function filterAndSortArtworks() {
    let filteredArtworks = artworks;

    if (filter !== "all") {
      filteredArtworks = artworks.filter(
        (artwork) => artwork.category.toLowerCase() === filter
      );
    }

    if (search) {
      filteredArtworks = filteredArtworks.filter((artwork) =>
        artwork.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price") {
      filteredArtworks.sort((a, b) =>
        a.price.localeCompare(b.price, "en-US", { numeric: true })
      );
    } else if (sort === "date") {
      filteredArtworks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filteredArtworks;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search artworks..."
              className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <select
              value={filter}
              onChange={handleFilter}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="all">All</option>
              <option value="painting">Painting</option>
              <option value="photography">Photography</option>
              <option value="sculpture">Sculpture</option>
            </select>
            <select
              value={sort}
              onChange={handleSort}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {filterAndSortArtworks().map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onDetailsClick={() => {
                // navigate function here to go to the details page.
              }}
              onFavoriteClick={() => {
                // Code to add the artwork to favorites.
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseArtworks;
