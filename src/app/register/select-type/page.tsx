"use client";

import { Button, Container, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Container style={{ paddingTop: "100px" }}>
      <Grid2 container direction={"column"} spacing={2} alignItems={"center"}>
        <Grid2 size={11}>
          <Typography variant="h2" color="textSecondary" paddingBottom={"50px"}>
            Criar uma conta
          </Typography>
        </Grid2>
        <Grid2 size={11}>
          <Button
            size="large"
            color="warning"
            variant="contained"
            style={{ color: "#fff" }}
            fullWidth
            onClick={() => router.push("/register/trainee")}
          >
            sou aluno(a)
          </Button>
        </Grid2>
        <Grid2 size={11}>
          <Button
            size="large"
            color="warning"
            variant="contained"
            style={{ color: "#fff" }}
            fullWidth
            onClick={() => router.push("/register/personal-trainer")}
          >
            sou instrutor(a)
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}
