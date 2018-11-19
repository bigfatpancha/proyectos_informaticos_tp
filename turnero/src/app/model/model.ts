export class Medico {
	id: number;
	specialty_id: number;
	enrollment: string;
	user_id: number;
	createdAt: string;
	updatedAt: string;
	personal_data: PersonalData;

}

export class MedicosResponse {
	success: boolean;
	doctors: Array<Medico>;
}

export class MedicoResponse {
	success: boolean;
	error: string;
}


export class MedicoRequest {
	name: string;
	surname: string;
	password: string;
	email: string;
	phone: string;
	specialty_id: number;

	constructor(name: string, surname: string, password: string, 
		email: string, phone: string, specialty_id: number) {
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.specialty_id = specialty_id;
	}
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
	user_id: number;
	doctor_id: number;
	date: string;
	state: string;
}

export class ConfirmationResponse {
	success: boolean;
}