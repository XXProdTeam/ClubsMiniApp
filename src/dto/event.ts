import type { UserRole } from './user'

export interface EventResponse {
	name: string
	description: string | null
	place: string | null
	start_time: string
	end_time: string
	images: string[]
	audience: string[]
	member_limit: number
}

export interface EventsReponse {
	events: EventResponse[]
}

export interface EventDTO {
	name: string
	description: string | null
	place: string | null
	startTime: Date
	endTime: Date
	images: string[]
	audience: UserRole[]
	memberLimit: number
}
