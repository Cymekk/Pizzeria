<template>
	<HeaderComponent />
	<div class="wrapper max-w-[1200px] mx-auto p-2">
		<AboutUsComponent />
	</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore'

const cartStore = useCartStore()

onMounted(() => {
	cartStore.getCart()
})
</script>

<style scoped></style>
