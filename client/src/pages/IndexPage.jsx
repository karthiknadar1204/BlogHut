import { useEffect } from "react";
import Post from "../components/Post.jsx";
import axios from "axios";
import { useState } from "react";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/post').then((response) => {
      const fetchedPosts = response.data; 
      setPosts(fetchedPosts);
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