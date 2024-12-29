import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth_context";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/home";
import DetalleBlog from "./pages/home/detalle_blog";
import Appbar from "./conponents/appbar/appbar";
import Footer from "./conponents/footer/footer";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Productos from "./pages/productos/productos";
import CrearBlog from "./pages/crear-blog/CrearBlog";
import EditarBlog from "./pages/EditarBlog/EditarBlog";
import MisBlogs from "./pages/mis-blogs/MisBlogs";
import Perfil from "./pages/perfil/Perfil";
//! PARA usar als variables de entorno.
import.meta.env.VITE_API_KEY;

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
  return (
    <div className="app-container">
      <Appbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/mis-blogs" element={<MisBlogs />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-blog" element={<CrearBlog />} />
          <Route path="/editar-blog" element={<EditarBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
