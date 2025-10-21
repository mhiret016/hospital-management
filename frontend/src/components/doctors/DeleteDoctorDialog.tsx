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
import { deleteDoctor } from "../../../api";
import type { DoctorInformation } from "../../types";

interface DeleteDoctorDialogProps {
  open: boolean;
  onClose: () => void;
  doctor: DoctorInformation;
}

const DeleteDoctorDialog = ({
  open,
  onClose,
  doctor,
}: DeleteDoctorDialogProps) => {
  const queryClient = useQueryClient();

  const deleteDoctorMutation = useMutation({
    mutationFn: async () => {
      await deleteDoctor(doctor.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteDoctorMutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Doctor</DialogTitle>
      <DialogContent>
        {deleteDoctorMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to delete doctor. Please try again.
          </Alert>
        )}
        <Typography>
          Are you sure you want to delete doctor{" "}
          <strong>
            Dr. {doctor.firstName} {doctor.lastName}
          </strong>
          ?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This action cannot be undone. All doctor records and assigned patients
          will be affected.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteDoctorMutation.isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={deleteDoctorMutation.isPending}
          startIcon={
            deleteDoctorMutation.isPending ? (
              <CircularProgress size={20} />
            ) : undefined
          }
        >
          {deleteDoctorMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDoctorDialog;
