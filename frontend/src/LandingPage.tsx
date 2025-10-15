import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  LocalHospital,
  People,
  CalendarToday,
  Phone,
} from "@mui/icons-material";

const LandingPage: React.FC = () => {
  const [apiData, setApiData] = useState("Loading...");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => setApiData(`${res.data.title.substring(0, 30)}...`))
      .catch(() => setApiData("API Demo Content"));
  }, []);

  const services = [
    {
      title: "Emergency Care",
      icon: <LocalHospital />,
      desc: "24/7 emergency services",
    },
    {
      title: "Expert Doctors",
      icon: <People />,
      desc: "Qualified specialists",
    },
    {
      title: "Appointments",
      icon: <CalendarToday />,
      desc: "Easy online booking",
    },
    { title: "Support", icon: <Phone />, desc: "Round-the-clock care" },
  ];

  return (
    <Box sx={{ height: "calc(100vh - 140px)", overflow: "hidden" }}>
      {/* Hero Section - Compact */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: 4,
          textAlign: "center",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Welcome to EVA Hospital
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Providing world-class healthcare with compassion and excellence
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Book Appointment
          </Button>
        </Container>
      </Box>

      {/* Services Section - Compact */}
      <Container maxWidth="lg" sx={{ py: 3, height: "60vh" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Services
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Experience healthcare excellence with our comprehensive medical
          services
        </Typography>

        {/* Services Grid */}
        <Grid container spacing={3} sx={{ height: "250px" }}>
          {services.map((service, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  height: "200px",
                  textAlign: "center",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
                }}
              >
                <Box sx={{ color: "primary.main", mb: 1 }}>
                  {React.cloneElement(service.icon, { sx: { fontSize: 36 } })}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer Info - Inline */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Contact:</strong> +1 (555) 123-4567 | info@evahospital.com |
            123 Health Street, Medical City
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>API Demo:</strong> {apiData}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
