<template>
	<NuxtPage />
	<UNotifications />
</template>

<script setup>
//imports
import { useCartStore } from './store/cartStore.ts'
import { useOrderStore } from './store/orderStore.js'

//store
const cartStore = useCartStore()
const orderStore = useOrderStore()

//getting cartItems from cookies on mounted hook
onMounted(() => {
	cartStore.init()
	orderStore.init()
})
</script>
