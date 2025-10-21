import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../../../api";
import type {
  PostNewAppointmentRequest,
  PatientInformation,
  DoctorInformation,
} from "../../types";

interface NewAppointmentFormProps {
  open: boolean;
  onClose: () => void;
  patients: PatientInformation[];
  doctors: DoctorInformation[];
}

const NewAppointmentForm = ({
  open,
  onClose,
  patients,
  doctors,
}: NewAppointmentFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<PostNewAppointmentRequest>({
    patientId: 0,
    doctorId: 0,
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      handleClose();
    },
  });

  const handleClose = () => {
    setFormData({
      patientId: 0,
      doctorId: 0,
      date: "",
      time: "",
    });
    setErrors({});
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.patientId || formData.patientId === 0) {
      newErrors.patientId = "Please select a patient";
    }
    if (!formData.doctorId || formData.doctorId === 0) {
      newErrors.doctorId = "Please select a doctor";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (field: keyof PostNewAppointmentRequest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule New Appointment</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {createMutation.isError && (
              <Alert severity="error">
                Failed to create appointment. Please try again.
              </Alert>
            )}

            <TextField
              select
              label="Patient"
              value={formData.patientId}
              onChange={(e) =>
                handleChange("patientId", Number(e.target.value))
              }
              error={!!errors.patientId}
              helperText={errors.patientId}
              required
              fullWidth
            >
              <MenuItem value={0}>Select a patient</MenuItem>
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName} - DOB:{" "}
                  {patient.dateOfBirth}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Doctor"
              value={formData.doctorId}
              onChange={(e) => handleChange("doctorId", Number(e.target.value))}
              error={!!errors.doctorId}
              helperText={errors.doctorId}
              required
              fullWidth
            >
              <MenuItem value={0}>Select a doctor</MenuItem>
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  Dr. {doctor.firstName} {doctor.lastName} -{" "}
                  {doctor.specialization}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="Appointment Date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />

            <TextField
              type="time"
              label="Appointment Time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              error={!!errors.time}
              helperText={errors.time}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={createMutation.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={createMutation.isPending}
            startIcon={
              createMutation.isPending ? (
                <CircularProgress size={20} />
              ) : undefined
            }
          >
            {createMutation.isPending ? "Creating..." : "Create Appointment"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewAppointmentForm;
