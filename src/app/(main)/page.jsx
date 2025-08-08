'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useZapros } from '../store/zapros'
import user from '@/app/assets/userBoy.svg'
import user1 from '@/app/assets/userGirl.svg'
import Image from 'next/image'
import shashlik from '@/app/assets/shashlik.jpg'
import afisant from '@/app/assets/afisant.jpeg'
import chef from '@/app/assets/chef.jpg'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CakeIcon from '@mui/icons-material/Cake'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import { TextField } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'

export default function Home() {
	const router = useRouter()
	const { korgar, getKorgar, addKorgar, panding, error } = useZapros()
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)
	const [age, setAge] = useState('')
	const [kor, setKor] = useState('')
	const [pol, setPol] = useState('')

	const handleChange = event => {
		setAge(event.target.value)
	}

	const handleChangeKor = event => {
		setKor(event.target.value)
	}

	const handleChangePol = event => {
		setPol(event.target.value)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = event => {
		event.preventDefault()

		const e = event.target

		const newUser = {
			name: e.name.value,
			surname: e.surname.value,
			number: e.number.value,
			job: kor,
			age: age,
			gander: pol,
		}

		addKorgar(newUser)
		setAge('')
		setKor('')
		setPol('')
		setOpen(false)
	}

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			router.push('/register')
		}

		getKorgar()
	}, [])

	if (panding) {
		return (
			<>
				<div className='pt-[30px] px-[30px]'>
					<Skeleton
						variant='rounded'
						width={200}
						height={40}
						animation='wave'
					/>
				</div>
				<section className='p-[30px] flex flex-wrap gap-[25px]'>
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className='w-full sm:w-[47%] md:w-[31%] lg:w-[23%] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative animate-pulse'
							style={{
								animationDelay: `${i * 100}ms`,
								animationDuration: '1.2s',
							}}
						>
							<div className='relative h-[80px] w-full bg-gray-300'></div>
							<div className='absolute top-[40px] left-1/2 transform -translate-x-1/2 z-10'>
								<div className='w-[75px] h-[75px] rounded-full bg-gray-400 border-4 border-white shadow-md'></div>
							</div>
							<div className='pt-[50px] px-4 pb-4 space-y-2'>
								<div className='w-[80%] h-4 bg-gray-300 rounded'></div>
								<div className='w-[60%] h-3 bg-gray-200 rounded'></div>
								<div className='w-[50%] h-3 bg-gray-200 rounded'></div>
								<div className='w-[70%] h-3 bg-gray-300 rounded'></div>
							</div>
						</div>
					))}
				</section>
			</>
		)
	}

	return (
		<>
			<div
				onClick={handleClickOpen}
				className='p-[25px] rounded-[50%] bg-blue-400 w-[50px] h-[50px] flex items-center justify-center text-white absolute bottom-[15px] right-[15px] md:bottom-[50px] md:right-[50px] z-50'
			>
				<PersonAddAltIcon />
			</div>
			<section className='pt-[30px] px-[30px]'>
				<TextField
					label='Search...'
					variant='standard'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</section>
			<section className='p-[30px] flex flex-wrap gap-[25px]'>
				{korgar
					?.filter(el =>
						JSON.stringify(el)
							.toLowerCase()
							.trim()
							.includes(search.toLowerCase().trim())
					)
					.map(el => (
						<div
							key={el.id}
							className='w-full sm:w-[47%] md:w-[31%] lg:w-[23%] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative transition duration-300 hover:shadow-lg'
						>
							{/* Верхняя фон-картинка */}
							<div className='relative h-[80px] w-full overflow-hidden rounded-t-xl'>
								{el.job === 'повар' && (
									<Image src={chef} alt='chef' fill className='object-cover' />
								)}
								{el.job === 'официантка' && (
									<Image
										src={afisant}
										alt='afisant'
										fill
										className='object-cover'
									/>
								)}
								{el.job === 'шашлыкпаз' && (
									<Image
										src={shashlik}
										alt='shashlik'
										fill
										className='object-cover'
									/>
								)}
							</div>

							{/* Фото пользователя — поверх фоновой картинки */}
							<div className='absolute top-[40px] left-1/2 transform -translate-x-1/2 z-10'>
								{el.gander === 'male' ? (
									<Image
										src={user}
										alt='user'
										width={75}
										height={75}
										className='rounded-full border-4 border-white shadow-md'
									/>
								) : (
									<Image
										src={user1}
										alt='user1'
										width={75}
										height={75}
										className='rounded-full border-4 border-white shadow-md'
									/>
								)}
							</div>

							{/* Контент */}
							<div className='pt-[50px] px-4 pb-4'>
								<p className='font-bold text-gray-800 text-[16px] mb-2'>
									{el.surname + ' ' + el.name}
								</p>

								<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
									<AssignmentIndIcon sx={{ width: 20 }} />
									<p>{el.job}</p>
								</div>

								<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
									<CakeIcon sx={{ width: 20 }} />
									<p>{el.age} сола</p>
								</div>

								<div className='flex items-center gap-2 text-rose-700 text-sm font-medium'>
									<PhoneIphoneIcon sx={{ width: 20 }} />
									<p>{el.number}</p>
								</div>
							</div>
						</div>
					))}
			</section>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Добавить Работника</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit} id='subscription-form'>
						<TextField
							autoFocus
							required
							margin='dense'
							id='name'
							name='name'
							label='Имя'
							type='text'
							fullWidth
							variant='standard'
						/>
						<TextField
							autoFocus
							required
							margin='dense'
							id='surname'
							name='surname'
							label='Фамилия'
							type='text'
							fullWidth
							variant='standard'
						/>
						<TextField
							autoFocus
							required
							margin='dense'
							id='number'
							name='number'
							label='Телефон'
							type='number'
							fullWidth
							variant='standard'
						/>
						<div className='flex gap-[15px] w-[100%]'>
							<FormControl
								variant='standard'
								sx={{
									m: 1,
									minWidth: {
										xs: '23%',
										sm: '29%',
									},
								}}
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Возраст
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={age}
									onChange={handleChange}
									label='Возраст'
								>
									<MenuItem value=''>
										<em>Нет</em>
									</MenuItem>
									<MenuItem value={15}>15 лет</MenuItem>
									<MenuItem value={16}>16 лет</MenuItem>
									<MenuItem value={17}>17 лет</MenuItem>
									<MenuItem value={18}>18 лет</MenuItem>
									<MenuItem value={19}>19 лет</MenuItem>
									<MenuItem value={20}>20 лет</MenuItem>
									<MenuItem value={21}>21 лет</MenuItem>
									<MenuItem value={22}>22 лет</MenuItem>
									<MenuItem value={23}>23 лет</MenuItem>
									<MenuItem value={24}>24 лет</MenuItem>
									<MenuItem value={25}>25 лет</MenuItem>
									<MenuItem value={26}>26 лет</MenuItem>
									<MenuItem value={27}>27 лет</MenuItem>
									<MenuItem value={28}>28 лет</MenuItem>
									<MenuItem value={29}>29 лет</MenuItem>
									<MenuItem value={30}>30 лет</MenuItem>
									<MenuItem value={31}>31 лет</MenuItem>
									<MenuItem value={32}>32 лет</MenuItem>
									<MenuItem value={33}>33 лет</MenuItem>
									<MenuItem value={34}>34 лет</MenuItem>
									<MenuItem value={35}>35 лет</MenuItem>
									<MenuItem value={36}>36 лет</MenuItem>
									<MenuItem value={37}>37 лет</MenuItem>
									<MenuItem value={38}>38 лет</MenuItem>
									<MenuItem value={39}>39 лет</MenuItem>
									<MenuItem value={40}>40 лет</MenuItem>
									<MenuItem value={41}>41 лет</MenuItem>
									<MenuItem value={42}>42 лет</MenuItem>
									<MenuItem value={43}>43 лет</MenuItem>
									<MenuItem value={44}>44 лет</MenuItem>
									<MenuItem value={45}>45 лет</MenuItem>
									<MenuItem value={46}>46 лет</MenuItem>
									<MenuItem value={47}>47 лет</MenuItem>
									<MenuItem value={48}>48 лет</MenuItem>
									<MenuItem value={49}>49 лет</MenuItem>
									<MenuItem value={50}>50 лет</MenuItem>
									<MenuItem value={51}>51 лет</MenuItem>
									<MenuItem value={52}>52 лет</MenuItem>
									<MenuItem value={53}>53 лет</MenuItem>
									<MenuItem value={54}>54 лет</MenuItem>
									<MenuItem value={55}>55 лет</MenuItem>
									<MenuItem value={56}>56 лет</MenuItem>
									<MenuItem value={57}>57 лет</MenuItem>
									<MenuItem value={58}>58 лет</MenuItem>
									<MenuItem value={59}>59 лет</MenuItem>
									<MenuItem value={60}>60 лет</MenuItem>
									<MenuItem value={61}>61 лет</MenuItem>
									<MenuItem value={62}>62 лет</MenuItem>
									<MenuItem value={63}>63 лет</MenuItem>
									<MenuItem value={64}>64 лет</MenuItem>
									<MenuItem value={65}>65 лет</MenuItem>
									<MenuItem value={66}>66 лет</MenuItem>
									<MenuItem value={67}>67 лет</MenuItem>
									<MenuItem value={68}>68 лет</MenuItem>
									<MenuItem value={69}>69 лет</MenuItem>
									<MenuItem value={70}>70 лет</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								variant='standard'
								sx={{
									m: 1,
									minWidth: {
										xs: '23%',
										sm: '29%',
									},
								}}
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Должность
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={kor}
									onChange={handleChangeKor}
									label='Должность'
								>
									<MenuItem value=''>
										<em>Нет</em>
									</MenuItem>
									<MenuItem value='официантка'>Официантка</MenuItem>
									<MenuItem value='повар'>Повар</MenuItem>
									<MenuItem value='шашлыкпаз'>Шашлыкпаз</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								variant='standard'
								sx={{
									m: 1,
									minWidth: {
										xs: '23%',
										sm: '29%',
									},
								}}
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Пол
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={pol}
									onChange={handleChangePol}
									label='Пол'
								>
									<MenuItem value=''>
										<em>Нет</em>
									</MenuItem>
									<MenuItem value='male'>Мужчина</MenuItem>
									<MenuItem value='fimale'>Женщина</MenuItem>
								</Select>
							</FormControl>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} sx={{ color: 'red' }}>
						Отмена
					</Button>
					<Button type='submit' form='subscription-form'>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
