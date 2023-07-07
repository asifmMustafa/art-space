import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseArtworks from "./pages/BrowseArtworks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/browse" element={<BrowseArtworks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
