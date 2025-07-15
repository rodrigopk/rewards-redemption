import { createContext, useContext, useEffect, useState } from "react";

import APIService from "../services/APIService";
import { useAuth } from "./AuthContext";

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const { token } = useAuth();
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!token) return;

      try {
        const data = await APIService.getPoints(token);
        setPoints(data.points);
      } catch (err) {
        console.error("Failed to fetch points:", err);
      }
    };

    fetchPoints();
  }, [token]);

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
