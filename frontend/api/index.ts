import axios, { type AxiosResponse } from "axios";
import type {
  DoctorInformation,
  PatientInformation,
  AppointmentInformation,
  PostNewAppointmentRequest,
  UpdateAppointmentRequest,
} from "../src/types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add JWT token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API functions
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<string> => {
  const response: AxiosResponse<string> = await axiosInstance.post(
    "/auth/login",
    credentials
  );
  if (response.status !== 200)
    throw new Error("An error has occurred during login");
  return response.data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<{ email: string }> => {
  const response: AxiosResponse<{ email: string }> = await axiosInstance.post(
    "/auth/register",
    credentials
  );
  if (response.status !== 200)
    throw new Error("An error has occurred during registration");
  return response.data;
};

export const getAllPatients = async (): Promise<PatientInformation[]> => {
  const response: AxiosResponse<PatientInformation[]> =
    await axiosInstance.get("/patient/");
  console.table(response);
  if (response.status !== 200) {
    throw new Error("An error has occurred while fetching the data");
  }
  return response.data;
};

export const getAllDoctors = async (): Promise<DoctorInformation[]> => {
  const response: AxiosResponse<DoctorInformation[]> =
    await axiosInstance.get("/doctor/");
  if (response.status !== 200)
    throw new Error("An error has occurred while fetching doctor data");
  return response.data;
};

export const getDoctorById = async (
  id: number
): Promise<DoctorInformation> => {
  const response: AxiosResponse<DoctorInformation> =
    await axiosInstance.get(`/doctor/${id}`);
  if (response.status !== 200)
    throw new Error("An error has occurred while fetching doctor details");
  return response.data;
};

// Appointment API functions
export const getAllAppointments = async (): Promise<
  AppointmentInformation[]
> => {
  const response: AxiosResponse<AppointmentInformation[]> =
    await axiosInstance.get("/appointment/");
  if (response.status !== 200)
    throw new Error("An error has occurred while fetching appointment data");
  return response.data;
};

export const getAppointmentById = async (
  id: number
): Promise<AppointmentInformation> => {
  const response: AxiosResponse<AppointmentInformation> =
    await axiosInstance.get(`/appointment/${id}`);
  if (response.status !== 200)
    throw new Error("An error has occurred while fetching appointment");
  return response.data;
};

export const createAppointment = async (
  request: PostNewAppointmentRequest
): Promise<AppointmentInformation> => {
  const response: AxiosResponse<AppointmentInformation> =
    await axiosInstance.post("/appointment/", request);
  if (response.status !== 201)
    throw new Error("An error has occurred while creating appointment");
  return response.data;
};

export const updateAppointment = async (
  id: number,
  request: UpdateAppointmentRequest
): Promise<AppointmentInformation> => {
  const response: AxiosResponse<AppointmentInformation> =
    await axiosInstance.put(`/appointment/${id}`, request);
  if (response.status !== 200)
    throw new Error("An error has occurred while updating appointment");
  return response.data;
};

export const cancelAppointment = async (
  id: number
): Promise<AppointmentInformation> => {
  const response: AxiosResponse<AppointmentInformation> =
    await axiosInstance.delete(`/appointment/${id}`);
  if (response.status !== 200)
    throw new Error("An error has occurred while cancelling appointment");
  return response.data;
};

// Patient API functions
export const getPatientById = async (
  id: number
): Promise<PatientInformation> => {
  const response: AxiosResponse<PatientInformation> =
    await axiosInstance.get(`/patient/${id}`);
  if (response.status !== 200)
    throw new Error("An error has occurred while fetching patient details");
  return response.data;
};

export const updatePatient = async (
  id: number,
  request: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    allergies: string[];
    doctorId: number;
  }
): Promise<PatientInformation> => {
  const response: AxiosResponse<PatientInformation> =
    await axiosInstance.put(`/patient/${id}`, request);
  if (response.status !== 200)
    throw new Error("An error has occurred while updating patient");
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/patient/${id}`);
  if (response.status !== 204)
    throw new Error("An error has occurred while deleting patient");
};

// Doctor mutation API functions
export const createDoctor = async (request: {
  firstName: string;
  lastName: string;
  specialization: string;
  department: string;
  phone: string;
  email: string;
}): Promise<DoctorInformation> => {
  const response: AxiosResponse<DoctorInformation> =
    await axiosInstance.post("/doctor/", request);
  if (response.status !== 201)
    throw new Error("An error has occurred while creating doctor");
  return response.data;
};

export const updateDoctor = async (
  id: number,
  request: {
    firstName: string;
    lastName: string;
    department: string;
    phone: string;
    specialization: string;
  }
): Promise<DoctorInformation> => {
  const response: AxiosResponse<DoctorInformation> =
    await axiosInstance.put(`/doctor/${id}`, request);
  if (response.status !== 200)
    throw new Error("An error has occurred while updating doctor");
  return response.data;
};

export const deleteDoctor = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/doctor/${id}`);
  if (response.status !== 204)
    throw new Error("An error has occurred while deleting doctor");
};
