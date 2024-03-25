import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./Context/AppContext.jsx";
import Sidebar from "./SideBar/SideBar";
import { Grid } from "@material-ui/core";
import App from "./App/App";
import Home from "./Home/Home";
import Audio from "./Audio/Audio.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container">
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <div className="main-content">
          <AppProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/document" element={<Home />} />
                <Route path="/audio" element={<Audio />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </div>
      </Grid>
    </div>
  </React.StrictMode>
);

reportWebVitals();
