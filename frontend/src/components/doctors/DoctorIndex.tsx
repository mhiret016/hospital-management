import type { DoctorInformation } from "../../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import InformationModal from "../shared/InformationModal";
import UpdateDoctorForm from "./UpdateDoctorForm";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
import { getDoctorById } from "../../../api";

const DoctorIndex = ({
  listOfDoctors,
}: {
  listOfDoctors: DoctorInformation[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState<DoctorInformation | null>(null);
  const [doctorToDelete, setDoctorToDelete] = useState<DoctorInformation | null>(null);

  // Fetch full doctor details with patients when a doctor is selected
  const { data: selectedDoctor, isLoading } = useQuery({
    queryKey: ["doctor", selectedDoctorId],
    queryFn: () => getDoctorById(selectedDoctorId!),
    enabled: selectedDoctorId !== null && isOpen,
  });

  const handleOpen = (doctor: DoctorInformation) => {
    setSelectedDoctorId(doctor.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctorId(null);
  };

  const handleEdit = (doctor: DoctorInformation) => {
    setDoctorToEdit(doctor);
    setUpdateFormOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false);
    setDoctorToEdit(null);
  };

  const handleDelete = (doctor: DoctorInformation) => {
    setDoctorToDelete(doctor);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDoctorToDelete(null);
  };

  const columns: GridColDef<DoctorInformation>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Button
          variant="text"
          onClick={() => handleOpen(params.row)}
          sx={{ textTransform: "none" }}
        >
          {`Dr. ${params.row.firstName} ${params.row.lastName}`}
        </Button>
      ),
      sortable: true,
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit Doctor">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Doctor">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: "500px", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={listOfDoctors}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
      {isOpen && (
        <>
          {isLoading ? (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1300,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            selectedDoctor && (
              <InformationModal
                information={selectedDoctor}
                isOpen={isOpen}
                onClose={handleClose}
              />
            )
          )}
        </>
      )}
      {doctorToEdit && (
        <UpdateDoctorForm
          open={isUpdateFormOpen}
          onClose={handleCloseUpdateForm}
          doctor={doctorToEdit}
        />
      )}
      {doctorToDelete && (
        <DeleteDoctorDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          doctor={doctorToDelete}
        />
      )}
    </Box>
  );
};

export default DoctorIndex;
