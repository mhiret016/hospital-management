import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "../../../api";
import type { PatientInformation } from "../../types";

interface DeletePatientDialogProps {
  open: boolean;
  onClose: () => void;
  patient: PatientInformation;
}

const DeletePatientDialog = ({
  open,
  onClose,
  patient,
}: DeletePatientDialogProps) => {
  const queryClient = useQueryClient();

  const deletePatientMutation = useMutation({
    mutationFn: async () => {
      await deletePatient(patient.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      onClose();
    },
  });

  const handleDelete = () => {
    deletePatientMutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Patient</DialogTitle>
      <DialogContent>
        {deletePatientMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to delete patient. Please try again.
          </Alert>
        )}
        <Typography>
          Are you sure you want to delete patient{" "}
          <strong>
            {patient.firstName} {patient.lastName}
          </strong>
          ?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This action cannot be undone. All patient records and appointments
          will be permanently removed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deletePatientMutation.isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={deletePatientMutation.isPending}
          startIcon={
            deletePatientMutation.isPending ? (
              <CircularProgress size={20} />
            ) : undefined
          }
        >
          {deletePatientMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePatientDialog;
