import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import IndexPage from "./pages/IndexPage";
import CreatePost from "./components/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./components/EditPost";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <header>
          <Header />
        </header>
        
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/edit/:id" element={<EditPost/>} />
        </Routes>

      </main>
    </BrowserRouter>
  );
};

export default App;
