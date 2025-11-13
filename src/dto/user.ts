export enum UserRole {
	admin = 'admin',
	student = 'student',
	applicant = 'applicant',
}

export interface UserDTO {
	user_id: number
	first_name: string
	last_name: string
	chat_id: number
	role: UserRole
}
