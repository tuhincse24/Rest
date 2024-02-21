import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/store/configureStore";
import { logInUser } from "./accoutSlice";
import { toast } from "react-toastify";
//
// TODO remove, this demo shouldn't need to reset the theme.
export default function Login() {
  const defaultTheme = createTheme();
  const navigate = useNavigate(); // In react-router-dom v6 useHistory() is replaced by useNavigate().

  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(logInUser(data)).then(() => {
        console.log(data);
        toast.success(`Welcome, Mr. ${data.username}`, {
          theme: "colored",
        });
      });
      navigate("/catalog");
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={
              errors?.username?.message ? String(errors.username.message) : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={
              errors?.password?.message ? String(errors.password.message) : ""
            }
          />
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Log in
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/forgetPassword">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">Don't have an account?</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
