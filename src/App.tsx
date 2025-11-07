import {
	Panel,
	Grid,
	Container,
	Flex,
	Avatar,
	Typography,
} from '@maxhub/max-ui'
import { Routes, Route, Link } from 'react-router-dom'
import MainParticipantPage from './pages/MainParticipantPage/MainParticipantPage'
import RolePickerPage from './pages/RolePickerPage'

const App = () => (
	<Panel mode='secondary' className='panel'>
		<Grid gap={12} cols={1}>
			<Routes>
				{/*<Route path='/' element={<Home />} />*/}
				<Route path='/' element={<RolePickerPage />} />
			</Routes>
		</Grid>
	</Panel>
)

export default App
