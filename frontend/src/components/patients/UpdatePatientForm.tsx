import { useEffect } from "react";
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
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { axiosInstance, getAllDoctors } from "../../../api";
import type { PatientInformation } from "../../types";

interface UpdatePatientFormProps {
  open: boolean;
  onClose: () => void;
  patient: PatientInformation;
}

interface PatientFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  allergies: string;
  doctorId: number;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(150, "First name must be less than 150 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(150, "Last name must be less than 150 characters")
    .required("Last name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[0-9\-\s.()]{10,15}$/,
      "Phone number must be 10-15 characters and contain only numbers, spaces, dashes, dots, or parentheses"
    )
    .required("Phone number is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters")
    .required("Address is required"),
  allergies: Yup.string().max(500, "Allergies must be less than 500 characters"),
  doctorId: Yup.number()
    .positive("Please select a doctor")
    .required("Doctor is required"),
});

const UpdatePatientForm = ({ open, onClose, patient }: UpdatePatientFormProps) => {
  const queryClient = useQueryClient();

  // Fetch all doctors for the dropdown
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  const updatePatientMutation = useMutation({
    mutationFn: async (values: PatientFormValues) => {
      const allergiesArray = values.allergies
        ? values.allergies.split(",").map((a) => a.trim()).filter((a) => a)
        : [];

      const response = await axiosInstance.put(`/patient/${patient.id}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        allergies: allergiesArray,
        doctorId: values.doctorId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      onClose();
    },
  });

  const initialValues: PatientFormValues = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    phoneNumber: patient.phone,
    address: patient.address,
    allergies: patient.allergies ? patient.allergies.join(", ") : "",
    doctorId: patient.primaryDoctor?.id || 0,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Patient Information</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          updatePatientMutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {updatePatientMutation.isError && (
                  <Alert severity="error">
                    Failed to update patient. Please check your inputs and try
                    again.
                  </Alert>
                )}

                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      required
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      required
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      placeholder="555-123-4567"
                      required
                    />
                  </Grid>

                  {/* Primary Doctor */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      id="doctorId"
                      name="doctorId"
                      label="Primary Doctor"
                      value={values.doctorId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.doctorId && Boolean(errors.doctorId)}
                      helperText={touched.doctorId && errors.doctorId}
                      required
                    >
                      <MenuItem value={0}>Select a doctor...</MenuItem>
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          Dr. {doctor.firstName} {doctor.lastName} -{" "}
                          {doctor.specialization}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      multiline
                      rows={2}
                      placeholder="123 Main St, City, State 12345"
                      required
                    />
                  </Grid>

                  {/* Allergies */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="allergies"
                      name="allergies"
                      label="Allergies"
                      value={values.allergies}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.allergies && Boolean(errors.allergies)}
                      helperText={
                        touched.allergies && errors.allergies
                          ? errors.allergies
                          : "Separate multiple allergies with commas (e.g., Penicillin, Peanuts)"
                      }
                      multiline
                      rows={2}
                      placeholder="Penicillin, Peanuts, Latex"
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClose}
                disabled={updatePatientMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updatePatientMutation.isPending || isSubmitting}
                startIcon={
                  updatePatientMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : undefined
                }
              >
                {updatePatientMutation.isPending
                  ? "Updating..."
                  : "Update Patient"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdatePatientForm;
