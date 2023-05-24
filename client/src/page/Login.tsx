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

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { login } = useAuth();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    login(
      { username: target.username.value, password: target.password.value },
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
        sx={{ width: "100%", bgcolor: "white", p: 2 }}
        autoComplete="off"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        <Typography textAlign="center" mb="1.2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et harum nam
          nisi
        </Typography>

        <TextField
          required
          name="username"
          label="username"
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
          Login
        </LoadingButton>
        <Typography textAlign={"center"} mt="1.2rem">
          Don't have an?{" "}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
