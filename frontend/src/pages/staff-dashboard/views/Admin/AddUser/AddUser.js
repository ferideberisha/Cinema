import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function AddUser() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Firstname is required")
      .min(3, "Firstname must be at least 3 characters")
      .max(50, "Firstname must not exceed 50 characters"),
    lastname: Yup.string()
      .required("Lastname is required")
      .min(3, "Lastname must be at least 3 characters")
      .max(50, "Lastname must not exceed 50 characters"),
    email: Yup.string().required("Email is required").email("Invalid Email."),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(260, "Password must not exceed 260 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    try {
      api.post("/api/users/register", data).then((userData) => {
        reset();
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        className="title"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">New User</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <TextField
              label="Firstname"
              fullWidth
              multiline
              maxRows={5}
              helperText={errors.firstname?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              {...register("firstname")}
              error={errors.firstname ? true : false}
            />
            <TextField
              label="Lastname"
              fullWidth
              multiline
              maxRows={5}
              helperText={errors.lastname?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              {...register("lastname")}
              error={errors.lastname ? true : false}
            />
            <TextField
              label="Email"
              fullWidth
              multiline
              maxRows={5}
              helperText={errors.email?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              helperText={errors.password?.message}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("password")}
              error={errors.password ? true : false}
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ mt: 5, mb: 5 }}
          >
            Add User
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}