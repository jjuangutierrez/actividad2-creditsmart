import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SimulatorPage from "./pages/SimulatorPage";
import ApplyCreditPage from "./pages/ApplyCreditPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/solicitar" element={<ApplyCreditPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
