import {
	Avatar,
	Button,
	CellAction,
	CellHeader,
	CellInput,
	CellList,
	CellSimple,
	Container,
	Counter,
	Flex,
	Grid,
	IconButton,
	Panel,
	Switch,
	ToolButton,
	Typography,
} from '@maxhub/max-ui'
import Icon24Placeholder from '../../icons/icon.svg'

const MainParticipantPage = () => (
	<Container>
		<Panel mode='secondary'>
			<Flex direction='column' gap={24}>
				<Container>
					<Flex direction='column' align='center' gap={16}>
						<Avatar.Container
							size={96}
							rightBottomCorner={<Avatar.OnlineDot />}
						>
							<Avatar.Image
								fallback='ME'
								src='https://sun9-77.userapi.com/s/v1/ig2/4iImaZbByvdNqUJMhtOQivmXejSSWPXHVV6hqT-R4C-pLcKIfYM-Fug7ABB4r2C1M5SAFnR4UwVVd-qfhEJbq0Kh.jpg?quality=95&crop=0,0,853,853&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=b1xqTXlJEHG1HUVKhZobYbEnwGYuh4BvLBYPL2lCZqI&cs=200x200'
							/>
						</Avatar.Container>

						<Flex direction='column' align='center'>
							<Typography.Headline variant='large-strong'>
								Vadim Tregubenko
							</Typography.Headline>
							<Typography.Body variant='small'>1 подписчик</Typography.Body>
						</Flex>

						<Grid cols={4} gap={8}>
							<ToolButton icon={<Icon24Placeholder />} onClick={() => {}}>
								Уведомл.
							</ToolButton>

							<ToolButton icon={<Icon24Placeholder />} onClick={() => {}}>
								Поиск
							</ToolButton>

							<ToolButton icon={<Icon24Placeholder />} onClick={() => {}}>
								Аудио
							</ToolButton>

							<ToolButton icon={<Icon24Placeholder />} onClick={() => {}}>
								Еще
							</ToolButton>
						</Grid>
					</Flex>
				</Container>

				<Flex direction='column' gap={16}>
					<CellList mode='island' header={<CellHeader>О себе</CellHeader>}>
						<CellSimple height='compact' title='Frontend engineer 👨‍💻' />
					</CellList>

					<CellList mode='island' header={<CellHeader>Телефон</CellHeader>}>
						<CellAction height='compact' onClick={() => {}}>
							+8 888 888 88 88
						</CellAction>
					</CellList>

					<CellList mode='island'>
						<CellSimple
							showChevron
							before={<Icon24Placeholder />}
							onClick={() => {}}
							title='Вложения'
							after={<Counter value={1245} rounded />}
							subtitle='Фото, видео, файлы и ссылки'
						/>
					</CellList>
				</Flex>

				<CellList mode='island' header={<CellHeader>Настройки</CellHeader>}>
					<CellInput before='Статус' placeholder='Укажите статус' />

					<CellInput before='Страна' placeholder='Укажите страну' />

					<CellInput before='Город' placeholder='Укажите город' />

					<CellSimple
						as='label'
						title='Закрытый профиль'
						after={<Switch defaultChecked={false} />}
					/>
				</CellList>

				<Container>
					<Flex gap={8}>
						<Button
							size='large'
							mode='secondary'
							appearance='neutral'
							stretched
						>
							Выйти
						</Button>

						<IconButton size='large' mode='secondary' appearance='neutral'>
							<Icon24Placeholder />
						</IconButton>
					</Flex>
				</Container>
			</Flex>
		</Panel>
	</Container>
)

export default MainParticipantPage
