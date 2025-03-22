"use client";

import { useAuth } from "@/context/AuthContext";
import { Button, Container, Typography } from "@mui/material";

export default function Page() {
  const { logout } = useAuth();

  return (
    <Container>
      <Typography>TRAINEE</Typography>
      <Button onClick={logout}>LOG OUT</Button>
    </Container>
  );
}
