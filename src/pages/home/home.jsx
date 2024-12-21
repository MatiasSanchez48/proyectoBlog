import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Blog from "./blog.jsx";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const backURL = import.meta.env.VITE_URL + "blog/";
      const response = await fetch(backURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      setBlogs(responseJson.data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {isLoading && <CircularProgress style={{ color: "#ffbb0067" }} />}
      {(blogs.length === 0 && !isLoading )  && <h3>No hay blogs...</h3>}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Home;
