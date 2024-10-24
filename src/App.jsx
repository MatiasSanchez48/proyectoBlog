import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<div>About</div>}></Route>
          <Route path="/contact" element={<div>Contact</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
