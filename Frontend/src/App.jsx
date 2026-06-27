import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Map from "./PAGES/Map";
import Dashboard from "./PAGES/Dashboard.jsx";
import Login from "./PAGES/Login.jsx";
import Register from "./PAGES/Register.jsx";
import Profile from "./PAGES/Profile.jsx";
import Artisans from "./PAGES/Artisans.jsx";
//import Reservation from "./pages/Reservation";
//import Paiement from "./pages/Paiement";
//import Facture from "./pages/Facture";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/map" element={<Map />} />
          <Route path="/reservation/:artisanId" element={<Reservation />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/facture" element={<Facture />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
