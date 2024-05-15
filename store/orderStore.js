import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
let supabase
let cartStore

export const useOrderStore = defineStore('orderStore', {
	state: () => {
		return { orders: [] }
	},

	actions: {
		init() {
			supabase = useSupabaseClient()
			cartStore = useCartStore()
		},

		async saveOrder(deliveryVal) {
			const id = crypto.randomUUID().split('-')[0]
			const delivery = true ? deliveryVal === 1 : false

			try {
				const { error } = await supabase
					.from('orders')
					.upsert({
						id: id,
						delivery: delivery,
						orderDetails: cartStore.cart,
						price: cartStore.sumOfPrice,
						status: 'Przyjęte do realizacji',
					})
					.select()
				if (error) {
					throw error
				}
			} catch (e) {
				console.log('bład', e.message)
			}
		},
	},
})
