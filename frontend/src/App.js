import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import Questions from "./pages/Questions.jsx";
import Interviews from "./pages/Interviews.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        <Sidebar />

        <div className="main-section">

          <Header />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/interviews" element={<Interviews />} />
            </Routes>
          </div>

          <Footer />

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;