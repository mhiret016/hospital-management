import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import { LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("jwt_token");
  const isAuthenticated = !!token;
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              cursor: "pointer",
            }}
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            EVA Hospital
          </Typography>

          {/* Navigation + Auth */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Show navigation only on dashboard */}
            {isDashboard && (
              <Typography
                variant="body1"
                sx={{ color: "#333", mr: 2, fontWeight: "medium" }}
              >
                Dashboard
              </Typography>
            )}

            {/* Auth Buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {isAuthenticated ? (
                <Button
                  variant="outlined"
                  startIcon={<LogOut size={18} />}
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    minWidth: "100px",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{
                      color: "#333",
                      textTransform: "none",
                      border: "1px solid #ccc",
                      minWidth: "80px",
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                    sx={{
                      textTransform: "none",
                      minWidth: "80px",
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
