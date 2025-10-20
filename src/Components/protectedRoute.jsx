import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import React from "react";

export default function ProtectedRoute({ children, setToken }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");

  // helper function to check expiry
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds
      return decoded.exp < currentTime;
    } catch (err) {
      return true; // invalid token
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const remainingTime = (decoded.exp - currentTime) * 1000;

        if (remainingTime > 0) {
          const timer = setTimeout(() => {
            localStorage.removeItem("jwt");
            navigate("/login");
          }, remainingTime);

          return () => clearTimeout(timer);
        } else {
          localStorage.removeItem("jwt");
          navigate("/login");
        }
      } catch (err) {
        localStorage.removeItem("jwt");
        navigate("/login");
      }
    }
  }, [token, navigate]);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return React.cloneElement(children, { setToken });
}