import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import VideoInput from "./VideoInput.jsx";
import InfractionsDisplay from "./InfractionsDisplay.jsx";
import Errorpage from "./Errorpage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<VideoInput />} />
        <Route path="/InfractionsDisplay" element={<InfractionsDisplay />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
