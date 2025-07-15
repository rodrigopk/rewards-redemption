import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Rewards from "./pages/Rewards";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/NavBar";
import Spinner from "./components/Spinner";
import Redemptions from "./pages/Redemptions";

const App = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className={token ? "pt-20 px-4" : ""}>
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
          <Route
            path="/redemptions"
            element={token ? <Redemptions /> : <Navigate to="/signin" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
