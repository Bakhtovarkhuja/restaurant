import axios from 'axios'
import { create } from 'zustand'

export const useZapros = create((set, get) => ({
	panding: false,
	error: false,
	korgar: null,
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
	},
	getKorgar: async () => {
		set({panding: true})
		set({error: false})
		try {
			const { data } = await axios.get('https://b613f1d8b6dbde2f.mokky.dev/korgar')
			set({korgar: data})
			set({panding: false})
		} catch (error) {
			console.error(error);
			set({error: true})
		}
	},
	addKorgar: async (newUser) => {
		try {
			await axios.post('https://b613f1d8b6dbde2f.mokky.dev/korgar', newUser)
			get().getKorgar()
		} catch (error) {
			console.error(error);
		}
	}
}))