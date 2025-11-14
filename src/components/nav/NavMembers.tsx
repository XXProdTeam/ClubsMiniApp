import { useState, useMemo, useEffect } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer'
import { Input } from '../ui/input'
import NavItem from './NavItem'
import { UsersRoundIcon } from 'lucide-react'
import { MemberStatus, type MemberDTO } from '@/dto/event'
import api from '@/api/api'

export const NavMembers = ({ eventId }: { eventId: number }) => {
	const [search, setSearch] = useState('')

	const [members, setMembers] = useState<MemberDTO[]>([])

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await api.get<MemberDTO[]>(
					`/events/${eventId}/members`
				)
				setMembers(response.data)
			} catch {
				/* empty */
			}
		}

		fetchMembers()
	}, [eventId])

	const filteredMembers = useMemo(() => {
		const q = search.toLowerCase().trim()
		if (!q) return members

		return members.filter(m => {
			const fullName = `${m.first_name} ${m.last_name}`.toLowerCase()
			return fullName.includes(q)
		})
	}, [search, members])

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<NavItem onClick={() => {}}>
					<UsersRoundIcon className='size-8' />
				</NavItem>
			</DrawerTrigger>

			<DrawerContent className='bg-zinc-900 border-zinc-800 text-zinc-200 h-[96dvh]'>
				<div className='mx-auto w-full max-w-sm text-center px-3 h-full flex flex-col gap-4'>
					<div className='flex-shrink-0'>
						<DrawerHeader>
							<DrawerTitle>Участники мероприятия</DrawerTitle>
							<DrawerDescription>
								Найдите интересующего вас участника
							</DrawerDescription>
						</DrawerHeader>

						<Input
							type='text'
							placeholder='Имя или фамилия участника...'
							className='bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-400'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-2 flex-grow overflow-y-auto pr-1'>
						{filteredMembers.map(member => {
							const fullName = `${member.first_name} ${member.last_name}`
							const initials =
								`${member.first_name[0]}${member.last_name[0]}`.toUpperCase()

							return (
								<div
									key={member.member_id}
									className='flex items-center justify-between'
								>
									<div className='flex items-center gap-2'>
										<Avatar className='size-12'>
											<AvatarFallback>{initials}</AvatarFallback>
										</Avatar>
										<h1 className='text-xl font-medium'>{fullName}</h1>
									</div>

									<Badge
										variant={
											member.status === MemberStatus.accept
												? 'default'
												: 'outline'
										}
									>
										{member.status === MemberStatus.accept
											? 'Пришел'
											: 'Зарегистрирован'}
									</Badge>
								</div>
							)
						})}
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
