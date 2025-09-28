import axios from 'axios'
import { create } from 'zustand'

export const useZapros = create((set, get) => ({
	data: null,
	pandingg: false,
	errorr: false,
	errorrr: false,
	panding: false,
	error: false,
	korgar: null,
	shashlik: null,
	register: async newUser => {
		set({ errorrr: false })
		set({ pandingg: true })
		try {
			const { data } = await axios.post('https://b613f1d8b6dbde2f.mokky.dev/register', newUser)
			set({ pandingg: false })
			set({data: data})
		} catch (error) {
			console.error(error)
			set({ errorrr: error })
			set({ pandingg: false })
		}
	},
	login: async newUser => {
		set({ errorr: false })
		set({ pandingg: true })
		try {
			const { data } = await axios.post(
				'https://b613f1d8b6dbde2f.mokky.dev/auth',
				newUser
			)
			set({ pandingg: false })
			set({data: data})
			localStorage.setItem('access_token', data.token)
		} catch (error) {
			console.error(error)
			set({ errorr: error })
			set({ pandingg: false })
		}
	},
	getKorgar: async () => {
		set({ panding: true })
		set({ error: false })
		try {
			const { data } = await axios.get(
				'https://b613f1d8b6dbde2f.mokky.dev/korgar'
			)
			set({ korgar: data })
			set({ panding: false })
		} catch (error) {
			console.error(error)
			set({ error: true })
			set({ panding: false })
		}
	},
	addKorgar: async newUser => {
		set({ error: false })
		set({ pandingg: true })
		try {
			await axios.post('https://b613f1d8b6dbde2f.mokky.dev/korgar', newUser)
			get().getKorgar()
			set({ pandingg: false })
		} catch (error) {
			console.error(error)
			set({ error: true })
			set({ pandingg: false })
		}
	},
	delKorgar: async id => {
		set({ error: false })
		set({ pandingg: true })
		try {
			await axios.delete(`https://b613f1d8b6dbde2f.mokky.dev/korgar/${id}`)
			get().getKorgar()
			set({ pandingg: false })
		} catch (error) {
			console.error(error)
			set({ error: true })
			set({ pandingg: false })
		}
	},
	editKorgar: async (id, user) => {
		set({ error: false })
		set({ pandingg: true })
		try {
			await axios.patch(`https://b613f1d8b6dbde2f.mokky.dev/korgar/${id}`, user)
			get().getKorgar()
			set({ pandingg: false })
		} catch (error) {
			console.error(error)
			set({ error: true })
			set({ pandingg: false })
		}
	},
	getShashlik: async () => {
		try {
			const { data } = await axios.get('https://b613f1d8b6dbde2f.mokky.dev/shashlik')
			set({ shashlik: data })
		} catch (error) {
			console.error(error);
		}
	}
}))
