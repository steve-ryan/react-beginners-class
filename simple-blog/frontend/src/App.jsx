import "./App.css";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./Components/Admin/Dashboard";
import WriterDashboard from "./Components/Writer/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/writer-dash" element={<WriterDashboard />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
