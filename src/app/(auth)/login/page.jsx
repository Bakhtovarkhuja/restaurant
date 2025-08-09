'use client'

import Image from 'next/image'
import registerBg from '@/app/assets/loginPhoto.webp'
import registerAsidePhoto from '@/app/assets/registerAsidePhoto.jpg'
import Login from '@/app/components/auth/login'
import { CircularProgress } from '@mui/material'
import { useZapros } from '@/app/store/zapros'
import { useRouter } from 'next/navigation'

export default function Page() {
	const router = useRouter()
	const { errorr, pandingg, data } = useZapros()

	console.log(errorr);

	console.log(data);
	

	if(errorr){
		if(errorr.message == 'Network Error'){
			alert('Проверьте интернет-соединение')
		}else{
			alert('Вы неправильно ввели имя или пароль')
		}
	}

	if(data?.token){
		router.push('/')
	}
	return (
		<div className='w-full min-h-screen relative'>
			{/* Затемнение фона */}
			<div className='absolute inset-0 bg-black/70 z-10' />
			<Image
				src={registerBg}
				alt='Фон регистрации'
				fill
				className='object-cover'
			/>

			{/* Контейнер */}
			<div className='absolute inset-0 z-20 flex justify-center items-center px-4 py-8'>
				<div className='flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-md md:h-[450px]'>
					{/* Левая часть: форма и переключатели */}
					<div className='w-full md:w-1/2 bg-gradient-to-br from-[#800020] to-[#3d0010] p-8 flex flex-col justify-center text-white gap-6'>
						{/* Toggle Buttons */}
						<h1 className='w-[100%] text-center text-white text-[30px]'>Войти</h1>
						<Login />
					</div>

					{/* Правая часть: изображение */}
					<div className='w-full md:w-1/2 relative h-[250px] md:h-auto'>
						<div className='absolute z-50 md:top-14 md:left-16 top-8 left-10'>
							<h1 className='text-white text-[30px] md:text-[40px]'>Добро пожаловать в</h1>
							<h2 className='text-[#800020] text-[40px] font-bold md:text-[55px]'>BUSTON</h2>
						</div>
						<div className='absolute inset-0 bg-black/80 z-10' />
						<Image
							src={registerAsidePhoto}
							alt='Фото сбоку'
							fill
							className='object-cover'
						/>
					</div>
				</div>
			</div>

			{pandingg && (
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-50'>
					<CircularProgress />
				</div>
			)}
		</div>
	)
}
