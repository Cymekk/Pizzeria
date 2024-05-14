<template>
	<div class="product flex justify-between items-center my-[12px] border-b-[1px] border-gray-700 dark:border-gray-200">
		<div class="product-info w-1/2">
			<p class="font-semibold">{{ props.product!.name }}</p>
			<p class="text-[10px] flex flex-wrap" v-if="props.product!.ingredients">
				Składniki: <p v-for="(item, index) in props.product!.ingredients">{{ item }},</p>
			</p>

		</div>


		<div class="amount flex flex-col items-center">
			<p>Szt.</p>
			<div class="buttons flex items-center">
				<UTooltip text="Zmniejsz ilość sztuk">
					<UButton color="gray" icon="i-heroicons-minus-16-solid" variant="ghost" @click="productAmount--" :disabled="productAmount===0"/>
				</UTooltip>

				<span>{{ productAmount }}</span>

				<UTooltip text="Zwiększ ilość sztuk">
					<UButton color="gray" icon="i-heroicons-plus-16-solid" variant="ghost" @click="productAmount++"/>
				</UTooltip>
			</div>
		</div>

		<div class="price-box flex flex-col items-center w-1/4">


			<span v-if="productAmount !== 0"> {{(props.product!.price * productAmount).toFixed(2) }} zł</span>
            <UTooltip text="Dodaj do koszyka">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-shopping-cart-solid"
					@click="validateInput()"
				/>
			</UTooltip>
		</div>
	</div>
</template>

<script setup lang="ts">
//props
const props = defineProps({
	product: {
		type: Object,
	},
})

///imports
import {useCartStore} from '~/store/cartStore'

//store
const cartStore = useCartStore()

//toast
const { toastSucces, toastError } = useAppToast()
const productAmount = ref(1)

const validateInput = () => {
	if(productAmount.value !== 0)
	{
		toastSucces('Dodano produkt do koszyka', `Produkt ${props.product!.name} w ilosci ${productAmount.value} szt. został pomyślnie dodany do koszyka`)
		const cartItem = reactive({
			name: props.product!.name,
			amount: productAmount.value,
			price: props.product!.price,
		})

		cartStore.addToCart(cartItem)
	}

	else{
		toastError('Błąd', 'Ilość sztuk produktu musi być większa niż 0')
	}
}








</script>

<style lang="scss" scoped></style>
