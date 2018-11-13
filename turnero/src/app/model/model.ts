export class Medico {
	id: number;
	specialty_id: number;
	enrollment: string;
	user_id: number;
	createdAt: string;
	updatedAt: string;
	personal_data: PersonalData;

}

export class PersonalData {
	id: number;
	name: string;
	surname: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
}

export class Especialidad {
	i: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export class TurnoResponse {
	success: boolean;
	schedule: Array<Turno>;
}

export class Turno {
	start_time: string;
	end_time: string;
	available: boolean;
}

export class AppointentResponse {
	success: boolean;
	appointments: Array<Appointment>;
}

export class Appointment {
	patient_id: number;
	doctor_id: number;
	date: string;
	state: string;
}
