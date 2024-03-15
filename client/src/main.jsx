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
import Report from "./Report.jsx";
import Aboutus from "./Aboutus.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-qtx0cvuzkawxwnd3.us.auth0.com"
        clientId="zCWv0SMMYhyzpU3m55TfQxYomukdmVbn"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/VideoInput" element={<VideoInput />} />
          <Route path="/InfractionsDisplay" element={<InfractionsDisplay />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
