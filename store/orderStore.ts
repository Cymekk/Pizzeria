import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'

let supabase
let cartStore

export const useOrderStore = defineStore('orderStore', {
	state: () => {
		return { orders: [], id: '', isLoading: false }
	},

	actions: {
		init() {
			supabase = useSupabaseClient()
			cartStore = useCartStore()
			this.fetchProducts()
		},

		async saveOrder(deliveryVal, state) {
			this.id = crypto.randomUUID().split('-')[0]
			const delivery = true ? deliveryVal === 1 : false

			if (deliveryVal) {
				let deliverAddress = state.city + ' ' + state.street + ' ' + state.homeNumber
				if (state.flatNumber !== '') {
					deliverAddress = deliverAddress + '/' + state.flatNumber
				}

				try {
					this.isLoading = true
					const { error } = await supabase
						.from('orders')
						.upsert({
							id: this.id,
							delivery: delivery,
							deliveryAddress: deliverAddress,
							orderDetails: cartStore.cart,
							price: cartStore.sumOfPrice,
							status: 'Przyjęte do realizacji',
							emailAddress: state.email,
						})
						.select()
					if (error) {
						throw error
					}
					this.fetchProducts()
					cartStore.removeAllProducts()
				} catch (e) {
				} finally {
					this.isLoading = false
				}
			} else {
				try {
					this.isLoading = true
					const { error } = await supabase
						.from('orders')
						.upsert({
							id: this.id,
							delivery: delivery,
							orderDetails: cartStore.cart,
							price: cartStore.sumOfPrice,
							status: 'Przyjęte do realizacji',
						})
						.select()
					if (error) {
						throw error
					}
					this.fetchProducts()
					cartStore.removeAllProducts()
				} catch (e) {
				} finally {
					this.isLoading = false
				}
			}
		},

		async fetchProducts() {
			try {
				const data = await useAsyncData('orders', async () => {
					const { data, error } = await supabase.from('orders').select()

					if (error) return []

					return data
				})

				this.orders = data.data.value
			} finally {
				console.log(this.orders)
			}
		},
	},
})
