import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { PodcastContextProvider } from "./context/podcastContext";
import { PlayerContextProvider } from "./context/playerContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <PlayerContextProvider>
    <PodcastContextProvider>
      <App />
    </PodcastContextProvider>
  </PlayerContextProvider>
);
reportWebVitals();
