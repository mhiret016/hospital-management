export interface PatientInformation {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  biologicalSex: string;
  allergies?: string;
}

export type DoctorInformation = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  phone: string;
  specialization: string;
  patients?: PatientInformation[];
};

export enum AppointmentStatus {
  BOOKED = "BOOKED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface AppointmentInformation {
  id: number;
  patient: PatientInformation;
  doctor: DoctorInformation;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export interface PostNewAppointmentRequest {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
}

export interface UpdateAppointmentRequest {
  doctorId: number;
  status: AppointmentStatus;
}
