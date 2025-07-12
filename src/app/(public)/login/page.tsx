"use client";
import {
  Alert,
  Button,
  Container,
  Grid2,
  Link,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import auth from "@/api/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { login, token, role } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const snackbarMessage = "Erro ao realizar login! Email ou senha inválidos";

  useEffect(() => {
    if (token) {
      const dashboardPath =
        role === "TRAINEE" ? "/dashboard/trainee" : "/dashboard/personal";
      router.push(dashboardPath);
    }
  }, [login, token, role, router]);

  async function onAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { token, user_id, role } = await auth({ email, password });
      login(token, user_id, role);
    } catch (ex) {
      setError(!error);
      console.error(ex);
    }

    setEmail("");
    setPassword("");
  }

  function closeSnackbar() {
    setError(false);
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <form onSubmit={onAuth}>
        <Grid2 container direction={"column"} spacing={2} alignItems={"center"}>
          <Snackbar
            open={error}
            autoHideDuration={5000}
            onClose={closeSnackbar}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            TransitionComponent={Slide}
          >
            <Alert variant="filled" severity="warning" color="warning">
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography variant="h2" color="textSecondary" paddingBottom={"50px"}>
            Login
          </Typography>

          <Grid2 size={11}>
            <TextField
              variant="outlined"
              size="medium"
              label="email"
              color="warning"
              type="email"
              value={email}
              required={true}
              autoComplete="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid2>
          <Grid2 size={11}>
            <TextField
              variant="outlined"
              size="medium"
              label="senha"
              color="warning"
              type="password"
              value={password}
              required={true}
              autoComplete="current-password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid2>
          <Grid2 size={11}>
            <Button
              type="submit"
              size="large"
              color="warning"
              variant="contained"
              style={{ color: "#fff" }}
              fullWidth
            >
              login
            </Button>
          </Grid2>

          <Grid2>
            <Link href="/register/select-type" color="warning" underline="none">
              Criar uma conta
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}
