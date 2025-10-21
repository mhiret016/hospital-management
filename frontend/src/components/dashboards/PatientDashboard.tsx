import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getAllPatients, getAllAppointments } from "../../../api";
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
  Chip,
} from "@mui/material";
import {
  UserPlus,
  Users,
  TrendingUp,
  Calendar,
  Activity,
  Clock,
} from "lucide-react";
import PatientIndex from "../patients/PatientIndex.tsx";
import NewPatientForm from "../patients/NewPatientForm.tsx";
import AppointmentIndex from "../appointments/AppointmentIndex.tsx";
import Navbar from "../../static/Navbar.tsx";
import Footer from "../../static/Footer.tsx";
import type { PatientInformation, AppointmentInformation } from "../../types";

const PatientDashboard = () => {
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  // In a real app, you would get the patient ID from authentication context
  const [patientId] = useState<number | null>(null);

  const [patientQuery, appointmentQuery] = useQueries({
    queries: [
      { queryKey: ["patients"], queryFn: getAllPatients },
      { queryKey: ["appointments"], queryFn: getAllAppointments },
    ],
  });

  const patients = patientQuery.data;
  const isLoading = patientQuery.isLoading || appointmentQuery.isLoading;
  const error = patientQuery.error || appointmentQuery.error;

  // Filter appointments for this patient
  const patientAppointments = useMemo(() => {
    if (!appointmentQuery.data) return [];
    const allAppointments = appointmentQuery.data as AppointmentInformation[];

    // If patientId is set, filter by patient, otherwise show all (for demo)
    if (patientId) {
      return allAppointments.filter((apt) => apt.patient.id === patientId);
    }
    return allAppointments;
  }, [appointmentQuery.data, patientId]);

  // Calculate appointment statistics
  const appointmentStats = useMemo(() => {
    const total = patientAppointments.length;
    const upcoming = patientAppointments.filter(
      (apt) => apt.status === "BOOKED"
    ).length;
    const completed = patientAppointments.filter(
      (apt) => apt.status === "COMPLETED"
    ).length;

    // Get next appointment
    const today = new Date();
    const futureAppointments = patientAppointments
      .filter((apt) => new Date(apt.date) >= today && apt.status === "BOOKED")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const nextAppointment = futureAppointments[0] || null;

    return { total, upcoming, completed, nextAppointment };
  }, [patientAppointments]);

  // Analytics calculations
  const analytics = useMemo(() => {
    if (!patients) return null;

    const patientList = patients as PatientInformation[];
    const totalPatients = patientList.length;

    // Gender distribution
    const genderDistribution = patientList.reduce((acc, patient) => {
      acc[patient.biologicalSex] = (acc[patient.biologicalSex] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Age distribution (by decade)
    const ageDistribution = patientList.reduce((acc, patient) => {
      const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
      const decade = Math.floor(age / 10) * 10;
      const key = `${decade}-${decade + 9}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Patients with allergies
    const patientsWithAllergies = patientList.filter(
      (p) => p.allergies && p.allergies.length > 0
    ).length;

    // Patients with assigned doctors
    const patientsWithDoctors = patientList.filter(
      (p) => p.primaryDoctor !== null
    ).length;

    return {
      totalPatients,
      genderDistribution,
      ageDistribution,
      patientsWithAllergies,
      patientsWithDoctors,
      assignmentRate: totalPatients > 0
        ? ((patientsWithDoctors / totalPatients) * 100).toFixed(1)
        : "0",
    };
  }, [patients]);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Users size={32} />
            Patient Management Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<UserPlus size={20} />}
            onClick={() => setIsNewPatientOpen(true)}
          >
            Add New Patient
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error loading patients: {(error as Error).message}
          </Alert>
        ) : analytics ? (
          <>
            {/* Appointment Statistics Cards */}
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
                  <Typography variant="h3">{appointmentStats.total}</Typography>
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
                    <Typography variant="h6">Upcoming</Typography>
                  </Box>
                  <Typography variant="h3">{appointmentStats.upcoming}</Typography>
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
                    <Activity size={24} />
                    <Typography variant="h6">Completed</Typography>
                  </Box>
                  <Typography variant="h3">{appointmentStats.completed}</Typography>
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
                    <Typography variant="h6">Next Appointment</Typography>
                  </Box>
                  {appointmentStats.nextAppointment ? (
                    <>
                      <Typography variant="body1">
                        {new Date(appointmentStats.nextAppointment.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        {appointmentStats.nextAppointment.time}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2">None scheduled</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* My Appointments Section */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Calendar size={24} />
                My Appointments
              </Typography>
              {patientAppointments.length > 0 ? (
                <>
                  <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                    <Chip
                      label={`Upcoming: ${appointmentStats.upcoming}`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Completed: ${appointmentStats.completed}`}
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                  <AppointmentIndex listOfAppointments={patientAppointments} />
                </>
              ) : (
                <Alert severity="info">
                  You have no appointments scheduled.
                </Alert>
              )}
            </Card>

            {/* Patient Analytics Cards */}
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
                    <Users size={24} />
                    <Typography variant="h6">Total Patients</Typography>
                  </Box>
                  <Typography variant="h3">{analytics.totalPatients}</Typography>
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
                    <TrendingUp size={24} />
                    <Typography variant="h6">Doctor Assignment</Typography>
                  </Box>
                  <Typography variant="h3">{analytics.assignmentRate}%</Typography>
                  <Typography variant="body2">
                    {analytics.patientsWithDoctors} of {analytics.totalPatients} assigned
                  </Typography>
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
                    <Activity size={24} />
                    <Typography variant="h6">With Allergies</Typography>
                  </Box>
                  <Typography variant="h3">{analytics.patientsWithAllergies}</Typography>
                  <Typography variant="body2">
                    {analytics.totalPatients > 0
                      ? ((analytics.patientsWithAllergies / analytics.totalPatients) * 100).toFixed(1)
                      : "0"}% of total
                  </Typography>
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
                    <Typography variant="h6">Gender Split</Typography>
                  </Box>
                  <Typography variant="body1">
                    M: {analytics.genderDistribution.MALE || 0} |
                    F: {analytics.genderDistribution.FEMALE || 0}
                  </Typography>
                  <Typography variant="body2">
                    Other: {analytics.genderDistribution.OTHER || 0}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Age Distribution */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Age Distribution
              </Typography>
              <Grid container spacing={1}>
                {Object.entries(analytics.ageDistribution)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([range, count]) => (
                    <Grid item xs={6} sm={4} md={2} key={range}>
                      <Paper sx={{ p: 1, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          {range} years
                        </Typography>
                        <Typography variant="h6">{count}</Typography>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Card>

            {/* Patient List */}
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                All Patients
              </Typography>
              <PatientIndex listOfPatients={patients as PatientInformation[]} />
            </Card>
          </>
        ) : null}

        {/* New Patient Form Dialog */}
        <NewPatientForm
          open={isNewPatientOpen}
          onClose={() => setIsNewPatientOpen(false)}
        />
      </Container>
      <Footer />
    </>
  );
};

export default PatientDashboard;
