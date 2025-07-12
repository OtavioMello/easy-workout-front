"use client";

import { create } from "@/api/services/personalTrainerService";
import {
  validateEmail,
  validateNickname,
} from "@/api/services/registerValidationService";
import { PersonalTrainerFormState } from "@/types/form.types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid2,
  IconButton,
  MobileStepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const initialFormState: PersonalTrainerFormState = {
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    arePasswordsEquals: true,
    isPasswordValid: true,
    emailError: "",
    nicknameError: "",
    isEmailValid: true,
    isNicknameValid: true,
    showPassword: false,
    showConfirmPassword: false,
  };

  const [form, setForm] = useState<PersonalTrainerFormState>(initialFormState);

  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onChangePassword(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let password = event.target.value;
    setForm((prev) => ({
      ...prev,
      password: password,
      isPasswordValid: password.length >= 6,
    }));
  }

  function onChangeConfirmPassword(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newConfirmPassword = event.target.value;
    setForm((prev) => ({
      ...prev,
      confirmPassword: newConfirmPassword,
      arePasswordsEquals: form.password === newConfirmPassword,
    }));
  }

  function onClickShowPassword() {
    setForm((prev) => ({
      ...prev,
      showPassword: !form.showPassword,
    }));
  }

  function onClickShowConfirmPassword() {
    setForm((prev) => ({
      ...prev,
      showConfirmPassword: !form.showConfirmPassword,
    }));
  }

  async function checkIfEmailAlreadyExists() {
    let email = form.email;

    if (email === "") return;
    try {
      const data = await validateEmail(email);

      if (data.exists) {
        setForm((prev) => ({
          ...prev,
          emailError: "Email já cadastrado",
          isEmailValid: false,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          emailError: "",
          isEmailValid: true,
        }));
      }
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        emailError: "Erro ao validar email",
        isEmailValid: false,
      }));
    }
  }

  async function checkIfNicknameAlreadyExists() {
    let nickname = form.nickname;
    if (nickname === "") return;
    try {
      const data = await validateNickname(nickname);

      if (data.exists) {
        setForm((prev) => ({
          ...prev,
          nicknameError: "Nome de usuário já está sendo usado",
          isNicknameValid: false,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          nicknameError: "",
          isNicknameValid: true,
        }));
      }
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        nicknameError: "Erro ao validar nome de usuário",
        isNicknameValid: false,
      }));
    }
  }

  function isActiveStepValid(): boolean {
    const requiredFields: (keyof PersonalTrainerFormState)[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];

    return (
      requiredFields.every(
        (field) => typeof form[field] === "string" && form[field].trim() !== ""
      ) &&
      form.isPasswordValid &&
      form.isEmailValid &&
      form.isNicknameValid &&
      form.arePasswordsEquals
    );
  }

  function handleCancel() {
    setForm(initialFormState);
    router.push("/login");
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { firstName, lastName, nickname, email, password } = form;

    try {
      await create({
        first_name: firstName,
        last_name: lastName,
        nickname: nickname,
        email: email,
        password: password,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <form onSubmit={handleRegister}>
        <Grid2 container direction={"column"} spacing={2} alignItems={"center"}>
          <Grid2 size={11}>
            <Typography
              variant="h2"
              color="textSecondary"
              paddingBottom={"50px"}
            >
              Dados Pessoais
            </Typography>
          </Grid2>
          <Grid2 size={11}>
            <TextField
              name="firstName"
              variant="outlined"
              size="medium"
              label="nome"
              color="warning"
              type="text"
              value={form.firstName}
              required={true}
              autoComplete="given-name"
              fullWidth
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={11}>
            <TextField
              name="lastName"
              variant="outlined"
              size="medium"
              label="sobrenome"
              color="warning"
              type="text"
              value={form.lastName}
              required={true}
              autoComplete="additional-name"
              fullWidth
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={11}>
            <TextField
              name="nickname"
              error={!form.isNicknameValid}
              helperText={form.nicknameError}
              variant="outlined"
              size="medium"
              label="nome de usuário"
              color="warning"
              type="text"
              value={form.nickname}
              required={true}
              autoComplete="nickname"
              fullWidth
              onChange={handleChange}
              onBlur={checkIfNicknameAlreadyExists}
            />
          </Grid2>
          <Grid2 size={11}>
            <TextField
              name="email"
              error={!form.isEmailValid}
              helperText={form.emailError}
              variant="outlined"
              size="medium"
              label="email"
              color="warning"
              type="email"
              value={form.email}
              required={true}
              autoComplete="email"
              fullWidth
              onChange={handleChange}
              onBlur={checkIfEmailAlreadyExists}
            />
          </Grid2>
          <Grid2 size={11}>
            <TextField
              name="password"
              error={!form.isPasswordValid}
              helperText={
                !form.isPasswordValid
                  ? "Senha deve conter no mínimo 6 caracteres"
                  : ""
              }
              variant="outlined"
              size="medium"
              label="senha"
              color="warning"
              type={form.showPassword ? "text" : "password"}
              value={form.password}
              required={true}
              autoComplete="password"
              fullWidth
              onChange={onChangePassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={onClickShowPassword}>
                      {form.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2 size={11} marginBottom={"45px"}>
            <TextField
              name="confirmPassword"
              error={!form.arePasswordsEquals}
              helperText={
                !form.arePasswordsEquals ? "Senhas não são iguais" : ""
              }
              variant="outlined"
              size="medium"
              label="confirmar senha"
              color="warning"
              type={form.showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              required={true}
              autoComplete="password"
              fullWidth
              onChange={onChangeConfirmPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={onClickShowConfirmPassword}>
                      {form.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2 size={11}>
            <MobileStepper
              variant="dots"
              backButton={
                <Button color="warning" onClick={handleCancel}>
                  cancelar
                </Button>
              }
              nextButton={
                <Button
                  color="warning"
                  type={"submit"}
                  disabled={!isActiveStepValid()}
                >
                  concluir
                </Button>
              }
              steps={1}
            ></MobileStepper>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}
