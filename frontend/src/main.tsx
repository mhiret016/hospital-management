import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx"; // Export Default Import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0077BE", // Medical blue
      light: "#4DA8DA",
      dark: "#005A8C",
    },
    secondary: {
      main: "#00A896", // Teal/turquoise - calming hospital color
      light: "#4DCCBA",
      dark: "#007D6E",
    },
    background: {
      default: "#E3F2FD", // Light blue background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A3A52", // Deep blue-gray
      secondary: "#5A7184",
    },
    success: {
      main: "#2ECC71", // Medical green
    },
    error: {
      main: "#E74C3C", // Medical red for alerts
    },
    warning: {
      main: "#F39C12", // Medical orange
    },
    info: {
      main: "#3498DB",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    h2: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    h3: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    h4: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    h5: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    h6: {
      fontWeight: 600,
      color: "#1A3A52",
    },
    body1: {
      color: "#1A3A52",
    },
    body2: {
      color: "#5A7184",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid #D1E3ED",
          boxShadow: "0 4px 16px rgba(0, 119, 190, 0.08)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0, 119, 190, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1A3A52",
          boxShadow: "0 2px 8px rgba(0, 119, 190, 0.08)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #D1E3ED",
          borderRadius: 12,
          "& .MuiDataGrid-cell": {
            color: "#1A3A52",
            borderColor: "#E8F1F5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#E8F4F8",
            color: "#1A3A52",
            borderColor: "#D1E3ED",
            fontWeight: 600,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#F8FBFD",
            borderColor: "#D1E3ED",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F0F8FB",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#E8F4F8",
            "&:hover": {
              backgroundColor: "#DBF0F7",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0, 119, 190, 0.2)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 119, 190, 0.3)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #0077BE 0%, #005A8C 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #005A8C 0%, #004670 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #00A896 0%, #007D6E 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #007D6E 0%, #005F52 100%)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FAFCFD",
            "& fieldset": {
              borderColor: "#D1E3ED",
            },
            "&:hover fieldset": {
              borderColor: "#0077BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0077BE",
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root": {
            color: "#5A7184",
            "&.Mui-focused": {
              color: "#0077BE",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#1A3A52",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1px solid #D1E3ED",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #F8FBFD 100%)",
          boxShadow: "0 2px 12px rgba(0, 119, 190, 0.1)",
          borderBottom: "1px solid #D1E3ED",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: "#E8F4F8",
          color: "#0077BE",
        },
        colorSecondary: {
          backgroundColor: "#E6F7F5",
          color: "#00A896",
        },
        colorSuccess: {
          backgroundColor: "#E8F8F0",
          color: "#2ECC71",
        },
        colorError: {
          backgroundColor: "#FDEDEB",
          color: "#E74C3C",
        },
      },
    },
  },
});

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
