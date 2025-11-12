export interface UserResponse {
	user_id: number
	first_name: string
	last_name: string
	role: string
}

export interface UserDTO {
	userId: number
	firstName: string
	lastName: string
	role: string
}

export enum UserRole {
	admin = 'admin',
	student = 'student',
	applicant = 'applicant',
}
