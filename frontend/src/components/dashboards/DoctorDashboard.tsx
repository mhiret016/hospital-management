import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../../../api";
import {
  Card,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import {
  Calendar,
  Stethoscope,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { AppointmentInformation } from "../../types";
import AppointmentIndex from "../appointments/AppointmentIndex.tsx";
import Navbar from "../../static/Navbar.tsx";
import Footer from "../../static/Footer.tsx";

const DoctorDashboard = () => {
  // In a real app, you would get the doctor ID from authentication context
  // For now, we'll filter by a mock doctor ID or show all
  const [doctorId] = useState<number | null>(null);

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  // Filter appointments for this doctor
  const doctorAppointments = useMemo(() => {
    if (!appointments) return [];
    const allAppointments = appointments as AppointmentInformation[];

    // If doctorId is set, filter by doctor, otherwise show all (for demo)
    if (doctorId) {
      return allAppointments.filter((apt) => apt.doctor.id === doctorId);
    }
    return allAppointments;
  }, [appointments, doctorId]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = doctorAppointments.length;
    const booked = doctorAppointments.filter(
      (apt) => apt.status === "BOOKED"
    ).length;
    const completed = doctorAppointments.filter(
      (apt) => apt.status === "COMPLETED"
    ).length;
    const cancelled = doctorAppointments.filter(
      (apt) => apt.status === "CANCELLED"
    ).length;

    // Get today's appointments
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = doctorAppointments.filter(
      (apt) => apt.date === today
    ).length;

    return { total, booked, completed, cancelled, todayAppointments };
  }, [doctorAppointments]);

  return (
    <>
      <Navbar />
      <Container
        sx={{
          marginTop: "1rem",
          marginBottom: "2rem",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Stethoscope size={32} />
            Doctor Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your appointments and patient schedules
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error loading appointments: {(error as Error).message}
          </Alert>
        ) : (
          <>
            {/* Statistics Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Calendar size={24} />
                    <Typography variant="h6">Total Appointments</Typography>
                  </Box>
                  <Typography variant="h3">{statistics.total}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Clock size={24} />
                    <Typography variant="h6">Today's Schedule</Typography>
                  </Box>
                  <Typography variant="h3">{statistics.todayAppointments}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle size={24} />
                    <Typography variant="h6">Completed</Typography>
                  </Box>
                  <Typography variant="h3">{statistics.completed}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Calendar size={24} />
                    <Typography variant="h6">Active/Cancelled</Typography>
                  </Box>
                  <Typography variant="h4">
                    {statistics.booked} / {statistics.cancelled}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Appointments Status Overview */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Appointment Status Overview
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip
                  label={`Booked: ${statistics.booked}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Completed: ${statistics.completed}`}
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`Cancelled: ${statistics.cancelled}`}
                  color="error"
                  variant="outlined"
                />
              </Box>
            </Card>

            {/* Appointments List */}
            <Card sx={{ padding: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Calendar size={24} />
                  My Appointments
                </Typography>
              </Box>
              {doctorAppointments.length > 0 ? (
                <AppointmentIndex listOfAppointments={doctorAppointments} />
              ) : (
                <Alert severity="info">
                  No appointments scheduled yet.
                </Alert>
              )}
            </Card>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
