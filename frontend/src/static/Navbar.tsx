import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";

const Navbar: React.FC = () => {
  const navItems = [
    "Home",
    "Services",
    "Doctors",
    "Appointments",
    "Patients",
    "Contact",
  ];
  const authItems = ["Sign In", "Register"];

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
            }}
          >
            EVA Hospital
          </Typography>

          {/* Navigation + Auth */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Regular Navigation Links */}
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#333",
                  textTransform: "none",
                  fontSize: "1rem",
                  mx: 0.5,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {item}
              </Button>
            ))}

            {/* Auth Buttons - Separate styling */}
            <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
              <Button
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
                sx={{
                  textTransform: "none",
                  minWidth: "80px",
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
