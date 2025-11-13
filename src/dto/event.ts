import type { UserRole } from './user'

export interface EventDTO {
	event_id: number
	name: string
	description: string | null
	place: string | null
	start_time: Date
	end_time: Date
	image_base64_list: string[]
	audience: UserRole[]
	member_limit: number
	num_members: number
}

export interface EventUserDTO {
	event_id: number
	name: string
	description: string | null
	place: string | null
	start_time: Date
	end_time: Date
	image_base64_list: string[]
	audience: UserRole[]
	member_limit: number
	num_members: number
	is_member: boolean
}
