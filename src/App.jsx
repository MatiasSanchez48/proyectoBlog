import "./App.css";
import Home from "./pages/home/home";
import DetalleBlog from "./pages/home/detalle_blog";
import Appbar from "./conponents/appbar/appbar";
import Footer from "./conponents/footer/footer";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/auth_context";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const { isLogger } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2024-10-02&sortBy=publishedAt&apiKey=84a09e563c9c44998149f8e57bcbeb93"
    );
    const data = await response.json();
    setBlogs(data.articles);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app-container">
      <Appbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:name" element={<DetalleBlog blogs={blogs} />} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {isLogger && <Footer />}
    </div>
  );
}

export default App;
