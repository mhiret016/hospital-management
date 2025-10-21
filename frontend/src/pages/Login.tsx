import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api";
import Navbar from "../static/Navbar";
import Footer from "../static/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      // Store token in localStorage
      localStorage.setItem("jwt_token", token);

      // Decode JWT to get user role
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const role = payload.role;

        // Navigate based on role
        if (role === "ADMIN") {
          navigate("/dashboard/admin");
        } else if (role === "STAFF") {
          navigate("/dashboard/doctor");
        } else if (role === "PATIENT") {
          navigate("/dashboard/patient");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/dashboard");
      }
    },
  });

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginMutation.mutate(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Card sx={{ width: "100%", boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Sign in to access your account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {loginMutation.isError && (
                  <Alert severity="error">
                    Invalid email or password. Please try again.
                  </Alert>
                )}

                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  fullWidth
                  autoComplete="email"
                />

                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  fullWidth
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loginMutation.isPending}
                  startIcon={
                    loginMutation.isPending ? (
                      <CircularProgress size={20} />
                    ) : undefined
                  }
                  sx={{ mt: 2 }}
                >
                  {loginMutation.isPending ? "Signing In..." : "Sign In"}
                </Button>

                <Typography variant="body2" textAlign="center" mt={2}>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
