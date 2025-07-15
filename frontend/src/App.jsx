import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Rewards from "./pages/Rewards";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/rewards" /> : <Navigate to="/signin" />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/rewards"
          element={token ? <Rewards /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
