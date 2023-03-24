import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
