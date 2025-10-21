import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
} from "../../api";
import {
  Card,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { Calendar, UserPlus, Stethoscope } from "lucide-react";
import PatientIndex from "./patients/PatientIndex.tsx";
import type {
  DoctorInformation,
  PatientInformation,
  AppointmentInformation,
} from "../types";
import DoctorIndex from "./doctors/DoctorIndex.tsx";
import AppointmentIndex from "./appointments/AppointmentIndex.tsx";
import NewAppointmentForm from "./appointments/NewAppointmentForm.tsx";
import NewPatientForm from "./patients/NewPatientForm.tsx";
import NewDoctorForm from "./doctors/NewDoctorForm.tsx";
import Navbar from "../static/Navbar.tsx";
import Footer from "../static/Footer.tsx";

const Dashboard = () => {
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

  return (
    <>
      <Navbar />
      <Container
        sx={{
          marginTop: "1rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "calc(100vh - 200px)",
        }}
      >
      {/* Appointments Section - Full Width */}
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
            Appointments
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
        {appointmentQuery.isLoading ? (
          <CircularProgress />
        ) : appointmentQuery.error ? (
          <Alert severity="error">
            Error loading appointments: {appointmentQuery.error.message}
          </Alert>
        ) : appointmentQuery.data ? (
          <AppointmentIndex
            listOfAppointments={appointmentQuery.data as AppointmentInformation[]}
          />
        ) : null}
      </Card>

      {/* Patients and Doctors Section - Side by Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "1rem",
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
          {patientQuery.isLoading ? (
            <CircularProgress />
          ) : patientQuery.error ? (
            <Alert severity="error">
              Error loading patients: {patientQuery.error.message}
            </Alert>
          ) : patientQuery.data ? (
            <PatientIndex
              listOfPatients={patientQuery.data as PatientInformation[]}
            />
          ) : null}
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
          {doctorQuery.isLoading ? (
            <CircularProgress />
          ) : doctorQuery.error ? (
            <Alert severity="error">
              Error loading doctors: {doctorQuery.error.message}
            </Alert>
          ) : doctorQuery.data ? (
            <DoctorIndex
              listOfDoctors={doctorQuery.data as DoctorInformation[]}
            />
          ) : null}
        </Card>
      </Box>

      {/* New Appointment Form Dialog */}
      {patientQuery.data && doctorQuery.data && (
        <NewAppointmentForm
          open={isNewAppointmentOpen}
          onClose={() => setIsNewAppointmentOpen(false)}
          patients={patientQuery.data as PatientInformation[]}
          doctors={doctorQuery.data as DoctorInformation[]}
        />
      )}

      {/* New Patient Form Dialog */}
      <NewPatientForm
        open={isNewPatientOpen}
        onClose={() => setIsNewPatientOpen(false)}
      />

      {/* New Doctor Form Dialog */}
      <NewDoctorForm
        open={isNewDoctorOpen}
        onClose={() => setIsNewDoctorOpen(false)}
      />
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;