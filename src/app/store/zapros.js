import axios from 'axios'
import { create } from 'zustand'

export const useZapros = create((set, get) => ({
	register: async (newUser) => {
		try {
			await axios.post('https://b613f1d8b6dbde2f.mokky.dev/register', newUser)
		} catch (error) {
			console.error(error);
		}
	},
	login: async (newUser) => {
		try {
			const { data } = await axios.post('https://b613f1d8b6dbde2f.mokky.dev/auth', newUser)
			localStorage.setItem('access_token', data.token)
		} catch (error) {
			console.error(error);
		}
	}
}))