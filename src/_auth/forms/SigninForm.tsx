import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/config/firebase";


const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Próba logowania przy użyciu Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Po poprawnym logowaniu przekierowanie na stronę główną
      navigate("/");
    } catch {
      setError("Błąd logowania. Sprawdź dane logowania i spróbuj ponownie.");
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
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
        Logowanie
      </Typography>

      {/* Wyświetlanie błędu logowania */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{
          mb: 2,
          borderRadius: 10
        }}
      />
      <TextField
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{
          mb: 2,
          borderRadius: 10
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{
          mt: 2,
          borderRadius: 10
        }}
      >
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Nie masz konta? <a href="/sign-up">Zarejestruj się</a>
      </Typography>
    </Box>
  );
};

export default SigninForm;
