import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            padding: "3rem",
            margin: "0 auto",
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to EVA Hospital
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" mb={4}>
            Your health is our priority.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{ minWidth: "150px" }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
              sx={{ minWidth: "150px" }}
            >
              Register
            </Button>
          </Box>
        </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: "1rem",
        }}
      >
        <Card className="card">
          <CardHeader
            title={
              <Typography variant="h3" component="h3">
                Healthcare as a Service
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Typography component="p">
              We provide top-notch healthcare services tailored to your needs.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardHeader
            title={
              <Typography variant="h3" component="h3">
                24/7 Support
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Typography component="p">
              Our medical team is available around the clock to assist you.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardHeader
            title={
              <Typography variant="h3" component="h3">
                Advanced Technology
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Typography component="p">
              We utilize the latest medical technology to ensure the best care.
            </Typography>
          </CardContent>
        </Card>
      </Container>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
