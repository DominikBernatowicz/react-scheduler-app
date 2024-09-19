import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/config/firebase";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Hasła muszą się zgadzać.");
      setLoading(false);
      return;
    }

    try {
      // Próba rejestracji przy użyciu Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      // Po poprawnej rejestracji przekierowanie na stronę główną
      navigate("/");
    } catch {
      setError("Rejestracja nie powiodła się. Sprawdź dane i spróbuj ponownie.");
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        mt: 5,
        maxWidth: 400,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        opacity: 0.8,
      }}
    >
      <Typography variant="h5" mb={2}>
        Rejestracja
      </Typography>

      {/* Wyświetlanie błędu rejestracji */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Potwierdź hasło"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Masz już konto? <a href="/sign-in">Zaloguj się</a>
      </Typography>
    </Box>
  );
};

export default SignupForm;
