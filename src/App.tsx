import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Search from "./pages/Search";
import Details from "./pages/Details";
function App() {
  return (
    <Router>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="podcast">
            <Route path=":id" element={<Details />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
