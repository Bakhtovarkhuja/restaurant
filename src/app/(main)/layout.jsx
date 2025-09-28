'use client'

import BarChartIcon from '@mui/icons-material/BarChart'
import CalculateIcon from '@mui/icons-material/Calculate'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import TableChartIcon from '@mui/icons-material/TableChart';
import { extendTheme } from '@mui/material/styles'
import { AppProvider, DashboardLayout } from '@toolpad/core'
import { usePathname, useRouter } from 'next/navigation'
// import Header from '@/app/components/layout/header';
import CircularProgress from '@mui/material/CircularProgress'
import { useZapros } from '../store/zapros'
// import Profile from '../components/profile/profile'

const NAVIGATION = [
	//   { kind: 'header', title: 'Основное' },
	{ segment: '', title: 'Главная', icon: <HomeIcon /> },
	{ segment: 'korgaro', title: 'Коллеги', icon: <GroupIcon /> },
	{ segment: 'statistika', title: 'Статистика', icon: <BarChartIcon /> },
	{ segment: 'table', title: 'Таблица', icon: <TableChartIcon /> },
	{ segment: 'colculate', title: 'Калькулятор', icon: <CalculateIcon /> },
	{ segment: 'login', title: 'Выйти', icon: <LoginIcon /> },
	// { segment: '#', title: '', icon: <Profile /> },
]

const theme = extendTheme({
	palette: {
		primary: {
			main: '#6B4C3B', // коричневый цвет
			light: '#8B6B53',
			dark: '#4A3425',
		},
		// можно добавить дополнительные цвета, если нужно
	},
	colorSchemes: { light: true, dark: true },
	colorSchemeSelector: 'class',
})

function useNextRouter() {
	const pathname = usePathname()
	const router = useRouter()

	return {
		pathname,
		searchParams: new URLSearchParams(),
		navigate: href => router.push(href),
	}
}

export default function RootLayout({ children }) {
	const router = useNextRouter()
	const { pandingg, error } = useZapros()

	if (error) {
		alert(
			'Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже. Или проверьте соединение.'
		)
	}

	return (
		<>
			<html lang='ru'>
				<body>
					<AppProvider theme={theme} navigation={NAVIGATION} router={router}>
						<DashboardLayout>
							{/* <Header /> */}
							{children}
						</DashboardLayout>
					</AppProvider>
					{pandingg && (
						<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-50'>
							<CircularProgress />
						</div>
					)}
				</body>
			</html>
		</>
	)
}
