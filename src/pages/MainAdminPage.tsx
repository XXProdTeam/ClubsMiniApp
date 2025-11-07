import {
	Panel,
	Grid,
	Container,
	Flex,
	Avatar,
	Typography,
} from '@maxhub/max-ui'
import { Routes, Route, Link } from 'react-router-dom'

const MainAdminPage = () => (
	<Container>
		<Flex direction='column' align='center'>
			<Avatar.Container size={72} form='circle'>
				<Avatar.Image src='https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg' />
			</Avatar.Container>
			<Typography.Title>Иван Иванов</Typography.Title>
			<Link to='/about'>Перейти к информации</Link>
		</Flex>
	</Container>
)

export default MainAdminPage
