"use client";

import {
  validateEmail,
  validateNickname,
} from "@/api/services/registerValidationService";
import { create } from "@/api/services/traineeService";
import { TraineeFormState } from "@/types/form.types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  MobileStepper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Page() {
  const initialFormState: TraineeFormState = {
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    weight: "",
    height: "",
    birthdate: null,
    gender: "",
    activeStep: 0,
    arePasswordsEquals: true,
    isPasswordValid: true,
    emailError: "",
    nicknameError: "",
    isEmailValid: true,
    isNicknameValid: true,
    showPassword: false,
    showConfirmPassword: false,
  };

  const [form, setForm] = useState<TraineeFormState>(initialFormState);

  const router = useRouter();

  useEffect(() => {
    setForm(initialFormState);
  }, []);

  function onChangeTextFieldValue(
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) {
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

  function onChangeBirthdate(value: Date | null) {
    setForm((prev) => ({
      ...prev,
      birthdate: value,
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

  async function checkIfEmailAlreadyExists(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const email = event.target.value;
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
      console.error(error);
      setForm((prev) => ({
        ...prev,
        emailError: "Erro ao validar email",
        isEmailValid: false,
      }));
    }
  }

  async function checkIfNicknameAlreadyExists(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const nickname = event.target.value;

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
      console.error(error);
      setForm((prev) => ({
        ...prev,
        nicknameError: "Erro ao validar nome de usuário",
        isNicknameValid: false,
      }));
    }
  }

  function isActiveStepValid(): boolean {
    const fistStepRequiredFields: (keyof TraineeFormState)[] = [
      "firstName",
      "lastName",
      "nickname",
      "email",
      "password",
      "confirmPassword",
    ];

    if (form.activeStep === 0) {
      return (
        fistStepRequiredFields.every(
          (field) =>
            typeof form[field] === "string" && form[field].trim() !== ""
        ) &&
        form.isPasswordValid &&
        form.isEmailValid &&
        form.isNicknameValid &&
        form.arePasswordsEquals
      );
    }

    return true;
  }

  function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (isActiveStepValid()) {
      setForm((prev) => ({
        ...prev,
        activeStep: prev.activeStep + 1,
      }));
    }
  }

  function handleBack() {
    if (form.activeStep > 0) {
      setForm((prev) => ({
        ...prev,
        activeStep: prev.activeStep - 1,
      }));
    } else {
      setForm(initialFormState);
      router.push("/login");
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const {
      firstName,
      lastName,
      nickname,
      email,
      password,
      weight,
      height,
      birthdate,
      gender,
    } = form;

    try {
      await create({
        first_name: firstName,
        last_name: lastName,
        nickname,
        email,
        password,
        weight: parseFloat(weight) || 0,
        height: parseFloat(height) || 0,
        birthdate: birthdate ? format(new Date(birthdate), "dd/MM/yyyy") : "",
        gender,
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
          {form.activeStep === 0 && (
            <>
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
                  onChange={onChangeTextFieldValue}
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
                  onChange={onChangeTextFieldValue}
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
                  onChange={onChangeTextFieldValue}
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
                  onChange={onChangeTextFieldValue}
                  onBlur={checkIfEmailAlreadyExists}
                />
              </Grid2>
              <Grid2 size={11}>
                <TextField
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
                          {form.showPassword ? (
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
              <Grid2 size={11} marginBottom={"45px"}>
                <TextField
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
            </>
          )}
          {form.activeStep === 1 && (
            <>
              <Grid2 size={11}>
                <TextField
                  name="weight"
                  variant="outlined"
                  size="medium"
                  label="peso"
                  color="warning"
                  type="number"
                  defaultValue={""}
                  value={form.weight}
                  autoComplete="off"
                  fullWidth
                  onChange={onChangeTextFieldValue}
                />
              </Grid2>
              <Grid2 size={11}>
                <TextField
                  name="height"
                  variant="outlined"
                  size="medium"
                  label="altura"
                  color="warning"
                  type="number"
                  defaultValue={""}
                  value={form.height}
                  autoComplete="off"
                  fullWidth
                  onChange={onChangeTextFieldValue}
                />
              </Grid2>
              <Grid2 size={11}>
                <DatePicker
                  name="birthdate"
                  label={"data de nascimento"}
                  format="dd/MM/yyyy"
                  value={form.birthdate}
                  onChange={onChangeBirthdate}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "medium",
                      color: "warning",
                      fullWidth: true,
                      autoComplete: "off",
                    },
                    day: {
                      sx: {
                        "&.MuiPickersDay-root.Mui-selected": {
                          backgroundColor: "#ffa726",
                        },
                      },
                    },
                  }}
                />
              </Grid2>
              <Grid2 size={11}>
                <FormControl fullWidth>
                  <InputLabel id="gender-select" color="warning">
                    gênero
                  </InputLabel>
                  <Select
                    name="gender"
                    size="medium"
                    label="gênero"
                    color="warning"
                    value={form.gender}
                    fullWidth
                    labelId="gender-select"
                    onChange={onChangeTextFieldValue}
                  >
                    <MenuItem value={"masculino"}>Masculino</MenuItem>
                    <MenuItem value={"feminino"}>Feminino</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
            </>
          )}
          <Grid2 size={11}>
            <MobileStepper
              variant="dots"
              activeStep={form.activeStep}
              backButton={
                <Button color="warning" onClick={handleBack}>
                  {form.activeStep === 0 ? "cancelar" : "anterior"}
                </Button>
              }
              nextButton={
                form.activeStep === 1 ? (
                  <Button
                    color="warning"
                    type="submit"
                    disabled={!isActiveStepValid()}
                  >
                    concluir
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    type="button"
                    onClick={handleNext}
                    disabled={!isActiveStepValid()}
                  >
                    próximo
                  </Button>
                )
              }
              steps={2}
            ></MobileStepper>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}
