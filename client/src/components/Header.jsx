import { Link } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import axios from 'axios';

const Header = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4001/profile', {
          withCredentials: true
        });
        console.log(response.data); // This should contain the cookies data
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/" className="logo">
          BlogHut
        </Link>
      </div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/create">Create new post</Link>
        <Link>Logout</Link>
      </nav>
    </div>
  );
};

export default Header;
