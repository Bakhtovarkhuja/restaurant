'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	if(!localStorage.getItem('access_token')){
		router.push('/auth')
	}

	return (
		<></>
	)
}
