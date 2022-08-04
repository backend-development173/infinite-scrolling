import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
