import type { EventUserDTO } from './dto/event'
import { UserRole } from './dto/user'

export const eventMock1: EventUserDTO = {
	event_id: 1,
	name: '...',
	description: '...',
	place: '...',
	start_time: new Date(),
	end_time: new Date(),
	image_base64_list: [],
	audience: [UserRole.student],
	member_limit: 1,
	num_members: 1,
	is_member: false,
}
