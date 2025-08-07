'use client'

import { useZapros } from '@/app/store/zapros'
import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
	const router = useRouter()
	const { login } = useZapros()
	const [error, setError] = useState()
	const [formData, setFormData] = useState({
		name: '',
		password: '',
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmitRegister = (e) => {
		e.preventDefault()
		login(formData)
		if(localStorage.getItem('access_token')){
			router.push('/')
		}else{
			setError('Этот аккаунт уже существует или нажмите на кнопку ещё раз')
		}
	}
	
	return (
		<Box
			component="form"
			onSubmit={handleSubmitRegister}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<TextField
				name="name"
				label="Имя"
				variant="outlined"
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
				name="password"
				label="Пароль"
				type="password"
				variant="outlined"
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
				type="submit"
				variant="contained"
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
				Войти
			</Button>
			<p className='text-blue-50 text-center'>У меня нет аккаунтов
				<Link href={'/register '}>
				 <span className='text-red-300 font-bold'> Register</span>
				</Link>
			</p>
			{error && (
				<p className='text-yellow-300 text-center'>{error}</p>
			)}
		</Box>
	)
}
