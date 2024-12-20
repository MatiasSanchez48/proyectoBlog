import { useEffect, useState } from "react";
import Blog from "./blog.jsx";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const backURL = import.meta.env.VITE_URL + "blog/";
      const response = await fetch(backURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      setBlogs(responseJson.data.blogs);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return (
      <>
        <h1>Home</h1>
        <h3>No hay blogs...</h3>
      </>
    );
  }
  return (
    <>
      <h1>Home</h1>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Home;
