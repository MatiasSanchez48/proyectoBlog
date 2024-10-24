import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import DetalleBlog from "./pages/home/detalle_blog";
import { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2024-09-24&sortBy=publishedAt&apiKey=84a09e563c9c44998149f8e57bcbeb93"
    );
    const data = await response.json();
    setBlogs(data.articles);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/blog/:name"
            element={<DetalleBlog blogs={blogs} />}
          ></Route>
          <Route path="/contact" element={<div>Contact</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
