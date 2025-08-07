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

export default function Home() {
	const router = useRouter()
	const { korgar, getKorgar } = useZapros()
	const [search, setSearch] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			router.push('/register')
		}

		getKorgar()
	}, [])

	return (
		<>
			<section className='pt-[30px] px-[30px]'>
				<TextField label="Search..." variant="standard" value={search} onChange={(e) => setSearch(e.target.value)}/>
			</section>
			<section className='p-[30px] flex flex-wrap gap-[25px]'>
				{korgar
				?.filter(el => JSON.stringify(el).toLowerCase().trim().includes(search.toLowerCase().trim()))
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
		</>
	)
}
