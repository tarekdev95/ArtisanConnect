import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Map from "./PAGES/Map";
import Dashboard from "./PAGES/Dashboard.jsx";
import Login from "./PAGES/Login.jsx";
import Register from "./PAGES/Register.jsx";
import Profile from "./PAGES/Profile.jsx";
import Artisans from "./PAGES/Artisans.jsx";
import Contact from "./PAGES/Contact.jsx";
import CommentCaMarche from "./PAGES/CommentCaMarche.jsx";
import Reservation from "./PAGES/Reservation.jsx";
import Facture from "./PAGES/Facture.jsx";
//import Paiement from "./pages/Paiement";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/reservation/:artisanId" element={<Reservation />} />
          <Route path="/facture" element={<Facture />} />
          {/* TODO: activer quand la page sera créée */}
          {/* <Route path="/paiement" element={<Paiement />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
