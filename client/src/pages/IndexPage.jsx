import { useEffect } from "react";
import Post from "../components/Post.jsx";
import axios from "axios";
import { useState } from "react";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/post').then((response) => {
      const fetchedPosts = response.data; // Use response.data to access the data
      setPosts(fetchedPosts); // Update the posts state with the fetched data
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </>
  );
};


export default IndexPage