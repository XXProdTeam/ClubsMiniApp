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
	feedback_text: string
	feedback_link: string
}

export enum MemberStatus {
	wait = 'wait',
	accept = 'accept',
}

export interface MemberDTO {
	user_id: number
	event_id: number
	status: MemberStatus
	member_id: number
	first_name: string
	last_name: string
}
