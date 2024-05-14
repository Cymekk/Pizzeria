<template>
	<div class="container mx-auto px-[12px]">
		<div class="header flex items-center justify-between">
			<h2 class="text-[24px] font-semibold">{{ title }}</h2>
			<span class="self-end">krok {{ step }} z 2</span>
		</div>
		<span v-if="cartItems.length === 0"
			>Twój koszyk jest pusty, przejdź prosze <NuxtLink to="menu" class="underline">menu</NuxtLink> i złoż
			zamówienia</span
		>

		<div class="cart-info" v-if="step === 1">
			<CartProductComponent v-for="(item, index) in cartItems" :key="index" :product="item" :index="index" />
			<div class="flex justify-end border-t-[1px] border-gray-700 dark:border-gray-200">
				<p><span class="font-semibold">Suma:</span> {{ cartStore.sumOfPrice }} zł</p>
			</div>

			<div class="buttons flex justify-end mt-[16px]" v-if="cartItems.length !== 0">
				<UButton icon="i-heroicons-arrow-right-circle-16-solid" @click="step++"> Dalej </UButton>
			</div>
		</div>

		<CartFormComponent v-else @prev-view="decrementStep()" />
	</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore'

const cartStore = useCartStore()

const cartItems = computed(() => {
	return cartStore.cart
})

const step = ref(1)
const title = computed(() => {
	return step.value === 1 ? 'Twój Koszyk' : 'Szczegóły Dostawy'
})

const decrementStep = () => {
	step.value--
}
</script>

<style lang="scss" scoped></style>
