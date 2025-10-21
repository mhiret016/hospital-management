import type { DoctorInformation, PatientInformation } from "../../types";
import {
  Box,
  Card,
  CardContent,
  Modal,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { X } from "lucide-react";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "600px" },
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  maxHeight: "90vh",
  overflow: "auto",
};

const InformationModal = ({
  information,
  isOpen,
  onClose,
}: {
  information: PatientInformation | DoctorInformation;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if ("phoneNumber" in information) {
    // Patient modal
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              {/* Header with Close Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Patient Information
                </Typography>
                <IconButton
                  onClick={onClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <X size={24} />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Patient Details */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {information.firstName} {information.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Date of Birth
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.dateOfBirth}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Biological Sex
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.biologicalSex}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.phoneNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.address}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Allergies
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    color={information.allergies ? "error.main" : "text.primary"}
                  >
                    {information.allergies || "None"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  } else {
    // Doctor modal
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              {/* Header with Close Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Doctor Information
                </Typography>
                <IconButton
                  onClick={onClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <X size={24} />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Doctor Details */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    Dr. {information.firstName} {information.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.department}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Specialization
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.specialization}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {information.phone}
                  </Typography>
                </Grid>
              </Grid>

              {/* Assigned Patients Section */}
              {information.patients && information.patients.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Assigned Patients ({information.patients.length})
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: "300px",
                      overflow: "auto",
                      mt: 2,
                    }}
                  >
                    {information.patients.map((patient, index) => (
                      <Box
                        key={patient.id}
                        sx={{
                          p: 2,
                          mb: 1,
                          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                          borderRadius: 1,
                          border: "1px solid #e0e0e0",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Patient Name
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {patient.firstName} {patient.lastName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Date of Birth
                            </Typography>
                            <Typography variant="body1">
                              {patient.dateOfBirth}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Phone
                            </Typography>
                            <Typography variant="body1">
                              {patient.phoneNumber}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Sex
                            </Typography>
                            <Typography variant="body1">
                              {patient.biologicalSex}
                            </Typography>
                          </Grid>
                          {patient.allergies && (
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Allergies
                              </Typography>
                              <Typography variant="body2" color="error.main">
                                {patient.allergies}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* No Patients Message */}
              {(!information.patients || information.patients.length === 0) && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Box
                    sx={{
                      p: 3,
                      textAlign: "center",
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No patients assigned to this doctor yet.
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  }
};

export default InformationModal;
