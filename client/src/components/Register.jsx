import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [Username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (e) => {
    e.preventDefault();
  
    console.log("Username:", Username);
    console.log("Password:", password);
  
    try {
      const response = await axios.post('http://localhost:4001/register', {
        Username, 
        password
      });
  
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      } else {
        setError("Registration failed.");
      }
    } catch (error) {
      console.error('Error registering user:', error.response); 
      setError("An error occurred while registering.");
    }
    
  };
  

  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Registration successful!</p>}
        <input
          type="text"
          placeholder="Username"
          value={Username} // Use 'Username' here
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
