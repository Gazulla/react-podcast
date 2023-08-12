import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import BottomPlayBar from "./components/BottomPlayBar";
function App() {
  return (
    <Router>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="podcast">
            <Route path=":id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </main>
      <BottomPlayBar></BottomPlayBar>
    </Router>
  );
}

export default App;
