import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import useAlert from "../atom/errorState";
import DisplayAlert from "../components/DisplayAlert";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register } = useAuth();
  const { setAlert } = useAlert();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert({ message: null, status: null });
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };
    if (
      !target.username.value ||
      !target.email.value ||
      !target.password.value
    ) {
      setAlert({
        message: "Make sure your all input fill in",
        status: "error",
      });
      return;
    }
    setIsLoading(true);
    register(
      {
        username: target.username.value,
        password: target.password.value,
        email: target.email.value,
      },
      () => setIsLoading(false)
    );
  };
  return (
    <Container
      component="section"
      maxWidth="sm"
      sx={{ minHeight: "90vh", display: "grid", placeItems: "center" }}
    >
      <Paper
        onSubmit={handleSubmit}
        sx={{ width: "100%", bgcolor: "white", p: 2 }}
        autoComplete="off"
        component="form"
      >
        <Typography variant="h5" textAlign="center">
          Register
        </Typography>
        <Typography textAlign="center" mb="1.2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et harum nam
          nisi
        </Typography>

        <DisplayAlert />

        <TextField
          name="username"
          id="username"
          label="Username"
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
        />
        <TextField
          required
          name="email"
          type="email"
          id="email"
          label="Your@gmail.com"
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
        />
        <FormControl
          sx={{ width: "100%", mb: "1.2rem" }}
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          sx={{ width: "100%" }}
        >
          Register
        </LoadingButton>
        <Typography textAlign={"center"} mt="1.2rem">
          Have An Account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
