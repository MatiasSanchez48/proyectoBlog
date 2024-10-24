import { useEffect, useState } from "react";
import Blog from "./blog.jsx";

const Home = () => {
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
      <h1>Home</h1>
      {blogs.map((blog) => (
        <Blog key={blog.source.id} blog={blog} />
      ))}
    </>
  );
};

export default Home;
