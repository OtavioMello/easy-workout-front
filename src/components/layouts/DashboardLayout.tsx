"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@/context/NavigationContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import theme from "@/styles/theme";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { selectedTab } = useNavigation();
  const { role } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const isTrainee = role === "TRAINEE";

  const routes = isTrainee
    ? [
        {
          id: 0,
          label: "Home",
          path: "/dashboard/trainee",
          icon: <HomeOutlinedIcon />,
        },
        {
          id: 1,
          label: "Treinos",
          path: "/dashboard/trainee/workouts",
          icon: <FitnessCenterOutlinedIcon />,
        },
        {
          id: 2,
          label: "Métricas",
          path: "/dashboard/trainee/metrics",
          icon: <BarChartOutlinedIcon />,
        },
        {
          id: 3,
          label: "Perfil",
          path: "/dashboard/trainee/account",
          icon: <AccountCircleOutlinedIcon />,
        },
      ]
    : [
        {
          id: 0,
          label: "Home",
          path: "/dashboard/personal-trainer",
          icon: <HomeOutlinedIcon />,
        },
        {
          id: 1,
          label: "Alunos",
          path: "/dashboard/personal-trainer/trainees",
          icon: <FitnessCenterOutlinedIcon />,
        },
        {
          id: 2,
          label: "Métricas",
          path: "/dashboard/personal-trainer/metrics",
          icon: <BarChartOutlinedIcon />,
        },
        {
          id: 3,
          label: "Perfil",
          path: "/dashboard/personal-trainer/account",
          icon: <AccountCircleOutlinedIcon />,
        },
      ];

  let greetingMessage = "Carregando...";

  if (user) {
    greetingMessage = `Olá, ${user.data.first_name}!`;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(routes[newValue].path);
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar style={{ zIndex: 50 }}>
          <Typography variant="h6" color="text.secondary">
            {selectedTab === 0 ? greetingMessage : ""}
          </Typography>
        </Toolbar>
      </AppBar>

      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            zIndex: 0,
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <List>
            {routes.map((route) => (
              <ListItem key={route.id} disablePadding>
                <ListItemButton
                  selected={selectedTab === route.id}
                  onClick={() => {
                    router.push(route.path);
                  }}
                  sx={{
                    "&.Mui-selected": {
                      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color: (theme) => theme.palette.warning.main,
                      },
                    },
                  }}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Container style={{ marginLeft: isDesktop ? 50 : 0 }}>
        {children}
      </Container>

      {!isDesktop && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={selectedTab}
            onChange={handleChange}
            sx={{
              "& .Mui-selected": {
                "& .MuiBottomNavigationAction-label": {
                  fontSize: (theme) => theme.typography.caption,
                  transition: "none",
                  fontWeight: "bold",
                  lineHeight: "20px",
                },
                "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                  color: (theme) => theme.palette.warning.main,
                },
              },
            }}
          >
            {routes.map((route) => (
              <BottomNavigationAction
                key={route.id}
                label={route.label}
                icon={route.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </div>
  );
}
