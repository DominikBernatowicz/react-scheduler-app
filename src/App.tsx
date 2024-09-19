import { Box } from "@mui/material";
import SchedulerView from "./_root/pages/SchedulerView";
import RootLayout from "./_root/RootLayout";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import { SigninForm, SignupForm } from "./_auth/forms";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config/firebase";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
            navigate('/');
          }
        } else {
          if (location.pathname !== '/sign-in' && location.pathname !== '/sign-up') {
            navigate('/sign-in'); 
          }
        }
      });

      return () => unsubscribe();
    };

    checkSession();
  }, [location, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<SchedulerView />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
