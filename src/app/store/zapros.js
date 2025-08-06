import axios from 'axios'
import { create } from 'zustand'

export const useZapros = create((set, get) => ({
	register: async (newUser) => {
		try {
			const {data} = await axios.post('https://b613f1d8b6dbde2f.mokky.dev/register', newUser)
			localStorage.setItem('access_token', data.token)
		} catch (error) {
			console.error(error);
		}
	}
}))