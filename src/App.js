import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
