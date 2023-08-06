import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseArtworks from "./pages/BrowseArtworks";
import ArtworkDetail from "./pages/ArtworkDetail";
import Cart from "./pages/Cart";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistAccount from "./pages/ArtistAccount";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";

import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/browse" element={<BrowseArtworks />} />
          <Route exact path="/artworkdetail" element={<ArtworkDetail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/artistProfile" element={<ArtistProfile />} />
          <Route exact path="/artistAccount" element={<ArtistAccount />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
