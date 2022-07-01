import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./screens/Home";
import Images from "./screens/Images";
import Sheets from "./screens/Sheets";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/images" element={<Images />} />
        <Route path="/sheets" element={<Sheets />} />
      </Routes>
    </div>
  );
}

export default App;