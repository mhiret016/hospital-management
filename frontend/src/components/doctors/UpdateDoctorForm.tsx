import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctor } from "../../../api";
import type { DoctorInformation } from "../../types";

interface UpdateDoctorFormProps {
  open: boolean;
  onClose: () => void;
  doctor: DoctorInformation;
}

interface DoctorFormValues {
  firstName: string;
  lastName: string;
  specialization: string;
  department: string;
  phone: string;
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
  specialization: Yup.string()
    .min(2, "Specialization must be at least 2 characters")
    .max(100, "Specialization must be less than 100 characters")
    .required("Specialization is required"),
  department: Yup.string()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department must be less than 100 characters")
    .required("Department is required"),
  phone: Yup.string()
    .matches(
      /^[+]?[0-9\-\s.()]{10,15}$/,
      "Phone number must be 10-15 characters and contain only numbers, spaces, dashes, dots, or parentheses"
    )
    .required("Phone number is required"),
});

const UpdateDoctorForm = ({ open, onClose, doctor }: UpdateDoctorFormProps) => {
  const queryClient = useQueryClient();

  const updateDoctorMutation = useMutation({
    mutationFn: async (values: DoctorFormValues) => {
      return await updateDoctor(doctor.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", doctor.id] });
      onClose();
    },
  });

  const initialValues: DoctorFormValues = {
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    specialization: doctor.specialization,
    department: doctor.department || "",
    phone: doctor.phone || "",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Doctor Information</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          updateDoctorMutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {updateDoctorMutation.isError && (
                  <Alert severity="error">
                    Failed to update doctor. Please check your inputs and try
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

                  {/* Specialization */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="specialization"
                      name="specialization"
                      label="Specialization"
                      value={values.specialization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.specialization && Boolean(errors.specialization)
                      }
                      helperText={touched.specialization && errors.specialization}
                      placeholder="e.g., Cardiology, Neurology"
                      required
                    />
                  </Grid>

                  {/* Department */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="department"
                      name="department"
                      label="Department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.department && Boolean(errors.department)}
                      helperText={touched.department && errors.department}
                      placeholder="e.g., Emergency, Surgery"
                      required
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12}>
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
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClose}
                disabled={updateDoctorMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateDoctorMutation.isPending || isSubmitting}
                startIcon={
                  updateDoctorMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : undefined
                }
              >
                {updateDoctorMutation.isPending
                  ? "Updating..."
                  : "Update Doctor"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateDoctorForm;
