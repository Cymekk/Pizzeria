import { defineStore } from 'pinia'

interface CartItem {
	name: string
	amount: number
	price: number
}

export const useCartStore = defineStore('cartStore', {
	state: () => {
		return { cart: [] as CartItem[] }
	},

	actions: {
		init() {
			this.getCart()
		},

		addToCart(item: CartItem): void {
			this.cart.push(item)
			this.saveCart()
		},

		changeAmount(name: string, value: number) {
			const index = this.cart.map(el => el.name).indexOf(name)
			this.cart[index].amount += value
			this.saveCart()
		},

		removeProduct(name: string) {
			const index = this.cart.map(el => el.name).indexOf(name)
			this.cart.splice(index, 1)
			this.saveCart()
		},

		getCart() {
			this.cart = JSON.parse(localStorage.getItem('cart') as string)
				? JSON.parse(localStorage.getItem('cart') as string)
				: []
		},

		saveCart() {
			localStorage.setItem('cart', JSON.stringify(this.cart))
		},
	},

	getters: {
		sumOfPrice(): number {
			let sum: number = 0

			this.cart.forEach(el => {
				sum += el.price * el.amount
			})

			sum.toFixed(2)

			return sum
		},
	},
})
