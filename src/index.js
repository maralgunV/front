// index.js
import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./Context/AppContext";
import Sidebar from "./SideBar/SideBar";
import { Grid } from "@material-ui/core";
import App from "./App/App"; // Assuming this is the main section
import Home from "./Home/Home"; // Assuming this is the document section
import Audio from "./Audio/Audio"; // Assuming this is the audio section

const MainComponent = () => {
  const homeRef = useRef(null);
  const audioRef = useRef(null);
  const documentRef = useRef(null);

  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="container">
      <Grid container>
        <Grid item xs={2}>
          <Sidebar
            onMenuClick={scrollToRef}
            homeRef={homeRef}
            documentRef={documentRef}
            audioRef={audioRef}
          />
        </Grid>
        <Grid item xs={10}>
          <div ref={homeRef}>
            <App />
          </div>
          <div ref={audioRef}>
            <Audio />
          </div>
          <div ref={documentRef}>
            <Home />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <MainComponent />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
