package com.example.health.hospital_management;

import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.enums.BiologicalSex;
import com.example.health.hospital_management.repositories.DoctorRepository;
import com.example.health.hospital_management.repositories.PatientRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@EnableJpaAuditing
@SpringBootApplication
public class HospitalManagementApplication implements CommandLineRunner {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	public static void main(String[] args) {
		SpringApplication.run(HospitalManagementApplication.class, args);
	}

	@Override
	public void run(String... args) {
		if (patientRepository.count() > 0 && doctorRepository.count() > 0) {
			System.out.println("Patients and doctors already exist in the database. Skipping data generation.");

			// Demo custom queries
			patientRepository.findAllByDateOfBirthOrderByLnameAsc(LocalDate.of(1981, 7, 1))
					.forEach(System.out::println);
			patientRepository.searchByName("K").forEach(System.out::println);
			return;
		}

		List<Doctor> doctors = generateDoctors();
		doctors = doctorRepository.saveAll(doctors);
		System.out.println("Sample doctors generated and saved to the database.");

		List<Patient> patients = generatePatients(doctors);
		patientRepository.saveAll(patients);
		System.out.println("Sample patients generated and saved to the database.");
	}

	private List<Doctor> generateDoctors() {
		Faker faker = new Faker();
		List<Doctor> doctors = new ArrayList<>();
		String[] specializations = {"Cardiology", "Pediatrics", "Orthopedics", "Neurology", "General Medicine"};

		for (int i = 0; i < 10; i++) {
			Doctor doctor = new Doctor(
					0,
					faker.name().firstName(),
					faker.name().lastName(),
					specializations[faker.random().nextInt(specializations.length)],
					faker.phoneNumber().cellPhone(),
					faker.internet().emailAddress(),
					null,
					null
			);
			doctors.add(doctor);
		}
		return doctors;
	}

	private List<Patient> generatePatients(List<Doctor> doctors) {
		Faker faker = new Faker();
		Random random = new Random();
		List<Patient> patients = new ArrayList<>();

		for (int i = 0; i < 50; i++) {
			Doctor doctor = doctors.get(random.nextInt(doctors.size()));

			Patient patient = Patient.builder()
					.fname(faker.name().firstName())
					.lname(faker.name().lastName())
					.dateOfBirth(faker.date().birthday(0, 90).toInstant()
							.atZone(java.time.ZoneId.systemDefault())
							.toLocalDate())
					.biologicalSex(random.nextBoolean() ? BiologicalSex.MALE : BiologicalSex.FEMALE)
					.phone(faker.phoneNumber().cellPhone())
					.address(faker.address().fullAddress())
					.allergies(List.of("Peanuts", "Gluten"))
					.primaryDoctor(doctor)
					.build();

			patients.add(patient);
		}

		return patients;
	}
}
