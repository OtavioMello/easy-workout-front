"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "../styles/theme";
import { AuthProvider } from "./AuthContext";

export default function ClientProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </AppRouterCacheProvider>
    </AuthProvider>
  );
}
