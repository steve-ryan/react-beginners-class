import "./App.css";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./Components/Admin/Dashboard";
import WriterDashboard from "./Components/Writer/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Admin/Home";
import Posts from "./Components/Admin/Posts";
import Writers from "./Components/Admin/Writers";
import Profile from "./Components/Admin/Profile";
import HomeWriter from "./Components/Writer/HomeWriter";
import ProfileWriter from "./Components/Writer/ProfileWriter";
import PostsWriter from "./Components/Writer/PostsWriter";
import AddPost from "./Components/Admin/AddPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-dash" element={<AdminDashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="posts" element={<Posts />}></Route>
          <Route path="writers" element={<Writers />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="addpost" element={<AddPost />}></Route>
        </Route>
        <Route path="/writer-dash" element={<WriterDashboard />}>
          <Route path="" element={<HomeWriter />}></Route>
          <Route path="writerposts" element={<PostsWriter />}></Route>
          <Route path="writerprofile" element={<ProfileWriter />}></Route>
        </Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
