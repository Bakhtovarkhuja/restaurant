'use client'

import { useZapros } from '@/app/store/zapros'
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function TablePage() {
	const { shashlik, getShashlik } = useZapros()

	useEffect(() => {
		getShashlik()
	}, [])

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						{shashlik?.map(el => (
							<TableCell
								key={el.id}
								align='center'
								sx={{
									fontWeight: 'bold',
									fontSize: '1.2rem',
									fontFamily: 'Poppins, Roboto, sans-serif',
									textTransform: 'uppercase',
									letterSpacing: 1,
								}}
							>
								{el.name}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						{shashlik?.map(el => (
							<TableCell key={el.id} align='center'>
								{el.day?.map(day => (
									<Box
										key={day.id}
										sx={{
											paddingY: 1,
											borderBottom: '1px solid gray',
											fontSize: '1rem',
										}}
									>
										{day.astatka}
									</Box>
								))}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
