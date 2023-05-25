import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../api/axios";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loadersSlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MOVIETICKETZ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#28282B",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderColor: "#00366b", // Set the border color of the TextField
            },
            "&:hover fieldset": {
              borderColor: "#00366b", // Set the border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00366b", // Set the border color when focused
            },
          },
        },
      },
    },
  },
  shadows: ["none"], // Disable the box shadow on focused TextField
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const { login_user } = useAuthContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const route = email.endsWith("@staff.com")
      ? "/api/staff/login"
      : "/api/users/login";
    const data = { email, password };
    try {
      dispatch(ShowLoading());

      const response = await api.post(route, data);
      console.log(response.data);
      login_user(response.data);
      dispatch(HideLoading());

      if (response.data.token) {
        setAlert({
          message: "Logged in successfully",
          severity: "success",
        });
      } else {
        setAlert({
          message: "Log in unsuccessful",
          severity: "error",
        });
      }
    } catch (err) {
      dispatch(HideLoading());
      setAlert({
        message: "Error",
        severity: "error",
      });
    }
  };

  const handleAlertClose = () => {
    setAlert(null);
    navigate("/login");
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        handleAlertClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {alert && (
            <Alert
              severity={alert.severity}
              onClose={handleAlertClose}
              sx={{ marginBottom: 3 }}
            >
              {alert.message}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "#00366b", color: "#fff" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#00366b",
                color: "#fff",
                "&:hover": { backgroundColor: "#004a94" },
              }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => navigate("/register")}
                  color="secondary.main"
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
