<template>
	<div class="flex justify-between items-center py-[6px] my-[6px]">
		<p class="w-1/2">{{ product!.name }}</p>

		<div class="plus-minus-buttons flex items-center w-1/4">
			<UTooltip text="Zmniejsz ilość sztuk">
				<UButton
					color="gray"
					icon="i-heroicons-minus-16-solid"
					variant="ghost"
					:disabled="product!.amount === 1"
					@click="cartStore.changeAmount(product!.name, -1)"
				/>
			</UTooltip>
			<span>{{ product!.amount }}</span>

			<UTooltip text="Zwiększ ilość sztuk">
				<UButton
					color="gray"
					icon="i-heroicons-plus-16-solid"
					variant="ghost"
					@click="cartStore.changeAmount(product!.name, 1)"
				/>
			</UTooltip>
		</div>

		<div class="price-and-delete-btn flex items-center justify-end w-1/4">
			<span>{{ price }} zł</span>
			<UTooltip text="Usuń produkt">
				<UButton
					color="gray"
					icon="i-heroicons-trash"
					variant="ghost"
					@click="cartStore.removeProduct(product!.name)"
				/>
			</UTooltip>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cartStore'

const props = defineProps({
	product: {
		type: Object,
	},

	index: {
		type: Number,
	},
})

const cartStore = useCartStore()

const price = computed(() => {
	return props.product!.price * props.product!.amount
})
</script>

<style lang="scss" scoped></style>
