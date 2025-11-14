import * as React from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CalendarIcon } from 'lucide-react'

interface DateTimePickerProps {
	value?: Date
	onChange: (date: Date) => void
}

export function DateTimePicker24h({ value, onChange }: DateTimePickerProps) {
	const [date, setDate] = React.useState<Date | undefined>(value)
	const [isOpen, setIsOpen] = React.useState(false)
	const hours = Array.from({ length: 24 }, (_, i) => i)
	const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			const newDate = date ? new Date(date) : new Date(selectedDate)
			newDate.setFullYear(
				selectedDate.getFullYear(),
				selectedDate.getMonth(),
				selectedDate.getDate()
			)
			setDate(newDate)
			onChange(newDate)
		}
	}

	const handleTimeChange = (type: 'hour' | 'minute', val: number) => {
		if (!date) return
		const newDate = new Date(date)
		if (type === 'hour') newDate.setHours(val)
		if (type === 'minute') newDate.setMinutes(val)
		setDate(newDate)
		onChange(newDate)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'dd/MM/yyyy HH:mm') : 'Выберите дату и время'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<div className='sm:flex'>
					<Calendar
						mode='single'
						selected={date}
						onSelect={handleDateSelect}
						initialFocus
					/>
					<div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
						<ScrollArea className='w-64 sm:w-auto'>
							<div className='flex sm:flex-col p-2'>
								{hours.map(hour => (
									<Button
										key={hour}
										size='icon'
										variant={
											date && date.getHours() === hour ? 'default' : 'ghost'
										}
										className='sm:w-full shrink-0 aspect-square'
										onClick={() => handleTimeChange('hour', hour)}
									>
										{hour}
									</Button>
								))}
							</div>
							<ScrollBar orientation='horizontal' className='sm:hidden' />
						</ScrollArea>
						<ScrollArea className='w-64 sm:w-auto'>
							<div className='flex sm:flex-col p-2'>
								{minutes.map(min => (
									<Button
										key={min}
										size='icon'
										variant={
											date && date.getMinutes() === min ? 'default' : 'ghost'
										}
										className='sm:w-full shrink-0 aspect-square'
										onClick={() => handleTimeChange('minute', min)}
									>
										{min.toString().padStart(2, '0')}
									</Button>
								))}
							</div>
							<ScrollBar orientation='horizontal' className='sm:hidden' />
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
