import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
} from "../../../api";
import {
  Card,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import {
  Calendar,
  UserPlus,
  Stethoscope,
  Users,
  Activity,
} from "lucide-react";
import PatientIndex from "../patients/PatientIndex.tsx";
import type {
  DoctorInformation,
  PatientInformation,
  AppointmentInformation,
} from "../../types";
import DoctorIndex from "../doctors/DoctorIndex.tsx";
import AppointmentIndex from "../appointments/AppointmentIndex.tsx";
import NewAppointmentForm from "../appointments/NewAppointmentForm.tsx";
import NewPatientForm from "../patients/NewPatientForm.tsx";
import NewDoctorForm from "../doctors/NewDoctorForm.tsx";
import Navbar from "../../static/Navbar.tsx";
import Footer from "../../static/Footer.tsx";

const AdminDashboard = () => {
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewDoctorOpen, setIsNewDoctorOpen] = useState(false);

  const [patientQuery, doctorQuery, appointmentQuery] = useQueries({
    queries: [
      { queryKey: ["patients"], queryFn: getAllPatients },
      { queryKey: ["doctors"], queryFn: getAllDoctors },
      { queryKey: ["appointments"], queryFn: getAllAppointments },
    ],
  });

  const isLoading =
    patientQuery.isLoading ||
    doctorQuery.isLoading ||
    appointmentQuery.isLoading;
  const hasError =
    patientQuery.error || doctorQuery.error || appointmentQuery.error;

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
            <Activity size={32} />
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all patients, doctors, and appointments
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : hasError ? (
          <Alert severity="error">
            Error loading data. Please try again later.
          </Alert>
        ) : (
          <>
            {/* Statistics Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
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
                    <Users size={24} />
                    <Typography variant="h6">Total Patients</Typography>
                  </Box>
                  <Typography variant="h3">
                    {(patientQuery.data as PatientInformation[])?.length || 0}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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
                    <Stethoscope size={24} />
                    <Typography variant="h6">Total Doctors</Typography>
                  </Box>
                  <Typography variant="h3">
                    {(doctorQuery.data as DoctorInformation[])?.length || 0}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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
                    <Calendar size={24} />
                    <Typography variant="h6">Total Appointments</Typography>
                  </Box>
                  <Typography variant="h3">
                    {(appointmentQuery.data as AppointmentInformation[])?.length || 0}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Appointments Section */}
            <Card sx={{ padding: 2, mb: 3 }}>
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
                  All Appointments
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsNewAppointmentOpen(true)}
                  disabled={
                    patientQuery.isLoading ||
                    doctorQuery.isLoading ||
                    !patientQuery.data ||
                    !doctorQuery.data
                  }
                >
                  Schedule Appointment
                </Button>
              </Box>
              {appointmentQuery.data && (
                <AppointmentIndex
                  listOfAppointments={appointmentQuery.data as AppointmentInformation[]}
                />
              )}
            </Card>

            {/* Patients and Doctors Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              <Card sx={{ flex: 1, padding: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5">Patients</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<UserPlus size={18} />}
                    onClick={() => setIsNewPatientOpen(true)}
                  >
                    Add Patient
                  </Button>
                </Box>
                {patientQuery.data && (
                  <PatientIndex
                    listOfPatients={patientQuery.data as PatientInformation[]}
                  />
                )}
              </Card>

              <Card sx={{ flex: 1, padding: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5">Doctors</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Stethoscope size={18} />}
                    onClick={() => setIsNewDoctorOpen(true)}
                  >
                    Add Doctor
                  </Button>
                </Box>
                {doctorQuery.data && (
                  <DoctorIndex
                    listOfDoctors={doctorQuery.data as DoctorInformation[]}
                  />
                )}
              </Card>
            </Box>
          </>
        )}

        {/* Dialogs */}
        {patientQuery.data && doctorQuery.data && (
          <NewAppointmentForm
            open={isNewAppointmentOpen}
            onClose={() => setIsNewAppointmentOpen(false)}
            patients={patientQuery.data as PatientInformation[]}
            doctors={doctorQuery.data as DoctorInformation[]}
          />
        )}

        <NewPatientForm
          open={isNewPatientOpen}
          onClose={() => setIsNewPatientOpen(false)}
        />

        <NewDoctorForm
          open={isNewDoctorOpen}
          onClose={() => setIsNewDoctorOpen(false)}
        />
      </Container>
      <Footer />
    </>
  );
};

export default AdminDashboard;
