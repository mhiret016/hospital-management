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
  Grid,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../api";

interface NewPatientFormProps {
  open: boolean;
  onClose: () => void;
}

interface PatientFormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  biologicalSex: string;
  phone: string;
  address: string;
  allergies: string;
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
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  biologicalSex: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Please select a valid biological sex")
    .required("Biological sex is required"),
  phone: Yup.string()
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
});

const NewPatientForm = ({ open, onClose }: NewPatientFormProps) => {
  const queryClient = useQueryClient();

  const createPatientMutation = useMutation({
    mutationFn: async (values: PatientFormValues) => {
      const response = await axiosInstance.post("/patient/add-patient", {
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        biologicalSex: values.biologicalSex,
        phone: values.phone,
        address: values.address,
        allergies: values.allergies,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      onClose();
    },
  });

  const initialValues: PatientFormValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    biologicalSex: "",
    phone: "",
    address: "",
    allergies: "",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Patient</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          createPatientMutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {createPatientMutation.isError && (
                  <Alert severity="error">
                    Failed to create patient. Please check your inputs and try
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

                  {/* Date of Birth */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: new Date().toISOString().split("T")[0],
                      }}
                      required
                    />
                  </Grid>

                  {/* Biological Sex */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      id="biologicalSex"
                      name="biologicalSex"
                      label="Biological Sex"
                      value={values.biologicalSex}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.biologicalSex && Boolean(errors.biologicalSex)
                      }
                      helperText={touched.biologicalSex && errors.biologicalSex}
                      required
                    >
                      <MenuItem value="">Select...</MenuItem>
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      placeholder="555-123-4567"
                      required
                    />
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
                disabled={createPatientMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={createPatientMutation.isPending || isSubmitting}
                startIcon={
                  createPatientMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : undefined
                }
              >
                {createPatientMutation.isPending
                  ? "Adding..."
                  : "Add Patient"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewPatientForm;
