import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import VideoInput from "./VideoInput.jsx";
import InfractionsDisplay from "./InfractionsDisplay.jsx";
import Errorpage from "./Errorpage.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { HomePage } from "./HomePage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ajs042kkdsdozlwv.us.auth0.com"
        clientId="1xcLl91yeHToBhhMRwJZLCQJikLuafjS"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/VideoInput" element={<VideoInput />} />
          <Route path="/InfractionsDisplay" element={<InfractionsDisplay />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
