import type { AppointmentInformation } from "../../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip } from "@mui/material";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { AppointmentStatus } from "../../types";

const AppointmentIndex = ({
  listOfAppointments,
}: {
  listOfAppointments: AppointmentInformation[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentInformation | null>(null);

  const handleOpen = (appointment: AppointmentInformation) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

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

  const columns: GridColDef<AppointmentInformation>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "patientName",
      headerName: "Patient",
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
          {`${params.row.patient.firstName} ${params.row.patient.lastName}`}
        </Button>
      ),
    },
    {
      field: "doctorName",
      headerName: "Doctor",
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      valueGetter: (value, row) =>
        `${row.doctor.firstName} ${row.doctor.lastName}`,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value as AppointmentStatus)}
          size="small"
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: "500px", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={listOfAppointments}
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
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default AppointmentIndex;
