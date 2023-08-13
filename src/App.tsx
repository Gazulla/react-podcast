import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import BottomPlayBar from "./components/BottomPlayBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="podcast">
          <Route index element={<div>Resource not found</div>} />
          <Route path=":id" element={<DetailsPage />} />
        </Route>
        <Route path="*" element={<div>Resource not found</div>} />
      </Routes>
      <footer className="h-28 md:h-32"></footer>
      <BottomPlayBar></BottomPlayBar>
    </Router>
  );
}

export default App;
