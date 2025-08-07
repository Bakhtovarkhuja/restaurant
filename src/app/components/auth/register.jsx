'use client'

import { useZapros } from '@/app/store/zapros'
import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
	const router = useRouter()
	const { register } = useZapros()
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		number: '',
		password: '',
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmitRegister = e => {
		e.preventDefault()
		register(formData)
		router.push('/login')
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmitRegister}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<TextField
				name='name'
				label='Имя'
				variant='outlined'
				fullWidth
				size='small'
				value={formData.name}
				onChange={handleChange}
				sx={{
					input: { color: 'white' },
					label: { color: 'white' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': { borderColor: 'white' },
						'&:hover fieldset': { borderColor: '#f5f5f5' },
						'&.Mui-focused fieldset': { borderColor: '#fff' },
					},
				}}
			/>
			<TextField
				name='surname'
				label='Фамилия'
				variant='outlined'
				fullWidth
				size='small'
				value={formData.surname}
				onChange={handleChange}
				sx={{
					input: { color: 'white' },
					label: { color: 'white' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': { borderColor: 'white' },
						'&:hover fieldset': { borderColor: '#f5f5f5' },
						'&.Mui-focused fieldset': { borderColor: '#fff' },
					},
				}}
			/>
			<TextField
				name='number'
				label='Номер телефона'
				type='tel'
				variant='outlined'
				fullWidth
				size='small'
				value={formData.number}
				onChange={handleChange}
				sx={{
					input: { color: 'white' },
					label: { color: 'white' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': { borderColor: 'white' },
						'&:hover fieldset': { borderColor: '#f5f5f5' },
						'&.Mui-focused fieldset': { borderColor: '#fff' },
					},
				}}
			/>
			<TextField
				name='password'
				label='Пароль'
				type='password'
				variant='outlined'
				fullWidth
				size='small'
				value={formData.password}
				onChange={handleChange}
				sx={{
					input: { color: 'white' },
					label: { color: 'white' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': { borderColor: 'white' },
						'&:hover fieldset': { borderColor: '#f5f5f5' },
						'&.Mui-focused fieldset': { borderColor: '#fff' },
					},
				}}
			/>
			<Button
				type='submit'
				variant='contained'
				sx={{
					mt: 1,
					backgroundColor: 'white',
					color: '#800020',
					fontWeight: 600,
					borderRadius: 2,
					'&:hover': {
						backgroundColor: '#f0f0f0',
					},
				}}
			>
				Зарегистрироваться
			</Button>
			<p className='text-blue-50 text-center'>
				У меня уже есть аккаунт
				<Link href={'/login '}>
					<span className='text-red-300 font-bold'> Log In</span>
				</Link>
			</p>
		</Box>
	)
}
