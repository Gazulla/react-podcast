import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import BottomPlayBar from "./components/BottomPlayBar";
function App() {
  return (
    <Router>
      <Header></Header>
      <main className="w-full max-w-5xl px-3">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="podcast">
            <Route path=":id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </main>
      <footer className="h-28"></footer>
      <BottomPlayBar></BottomPlayBar>
    </Router>
  );
}

export default App;
