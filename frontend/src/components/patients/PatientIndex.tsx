import type { PatientInformation } from "../../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import InformationModal from "../shared/InformationModal";
import UpdatePatientForm from "./UpdatePatientForm";
import DeletePatientDialog from "./DeletePatientDialog";

const PatientIndex = ({
  listOfPatients,
}: {
  listOfPatients: PatientInformation[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientInformation | null>(null);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] =
    useState<PatientInformation | null>(null);
  const [patientToDelete, setPatientToDelete] =
    useState<PatientInformation | null>(null);

  const handleOpen = (patient: PatientInformation) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  const handleEdit = (patient: PatientInformation) => {
    setPatientToEdit(patient);
    setUpdateFormOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false);
    setPatientToEdit(null);
  };

  const handleDelete = (patient: PatientInformation) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setPatientToDelete(null);
  };

  const columns: GridColDef<PatientInformation>[] = [
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
          {`${params.row.firstName} ${params.row.lastName}`}
        </Button>
      ),
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
          <Tooltip title="Edit Patient">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Patient">
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
        rows={listOfPatients}
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
      {selectedPatient && (
        <InformationModal
          information={selectedPatient}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
      {patientToEdit && (
        <UpdatePatientForm
          open={isUpdateFormOpen}
          onClose={handleCloseUpdateForm}
          patient={patientToEdit}
        />
      )}
      {patientToDelete && (
        <DeletePatientDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          patient={patientToDelete}
        />
      )}
    </Box>
  );
};

export default PatientIndex;
