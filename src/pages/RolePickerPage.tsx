import {
	Panel,
	Grid,
	Container,
	Flex,
	Avatar,
	Typography,
	Button,
} from '@maxhub/max-ui'
import { Routes, Route, Link } from 'react-router-dom'

const RolePickerPage = () => (
	<Panel>
		<Flex direction='column' gap={128} align='center'>
			<Flex direction='column' gap={2} align='center'>
				<Typography.Headline>Добро пожаловать в</Typography.Headline>
				<Typography.Headline>Hack Clubs</Typography.Headline>
			</Flex>

			<Typography.Headline variant='medium'>Кто вы?</Typography.Headline>
			<Flex direction='column' gap={32} align='center'>
				<Flex direction='column' gap={6} align='center'>
					<Button>Я - Абитуриент</Button>
					<Button>Я - Студент</Button>
				</Flex>
				<Typography.Label variant='large'> или </Typography.Label>
				<Flex direction='column' gap={24} align='center'>
					<Button appearance='contrast-static'>Я - Организатор</Button>
				</Flex>
			</Flex>
		</Flex>
	</Panel>
)

export default RolePickerPage
