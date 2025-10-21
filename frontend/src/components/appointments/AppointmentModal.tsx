import {
  Modal,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import type { AppointmentInformation } from "../../types";
import { AppointmentStatus } from "../../types";
import { Calendar, Clock, User, Stethoscope, MapPin, Phone } from "lucide-react";

interface AppointmentModalProps {
  appointment: AppointmentInformation;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal = ({
  appointment,
  isOpen,
  onClose,
}: AppointmentModalProps) => {
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.BOOKED:
        return "primary";
      case AppointmentStatus.COMPLETED:
        return "success";
      case AppointmentStatus.CANCELLED:
        return "error";
      default:
        return "default";
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "90vh",
    overflow: "auto",
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold">
            Appointment Details
          </Typography>
          <Chip
            label={appointment.status}
            color={getStatusColor(appointment.status)}
            sx={{ fontWeight: "bold" }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Appointment Info */}
        <Card sx={{ mb: 3, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Appointment Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Calendar size={20} />
                  <Typography variant="body1">
                    <strong>Date:</strong> {appointment.date}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Clock size={20} />
                  <Typography variant="body1">
                    <strong>Time:</strong> {appointment.time}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Patient Info */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <User size={24} />
              <Typography variant="h6" fontWeight="bold">
                Patient Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {appointment.patient.dateOfBirth}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone size={16} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {appointment.patient.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MapPin size={16} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {appointment.patient.address}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {appointment.patient.allergies && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Allergies
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" color="error">
                    {appointment.patient.allergies}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Doctor Info */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Stethoscope size={24} />
              <Typography variant="h6" fontWeight="bold">
                Doctor Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Specialization
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {appointment.doctor.specialization}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {appointment.doctor.department}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone size={16} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {appointment.doctor.phone}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
