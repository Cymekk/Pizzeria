<template>
	<NavbarComponent />

	<div class="px-4 py-2">
		<UForm :state="state" @submit="onSubmit" class="mt-[16px] flex flex-col items-center">
			<UFormGroup label="Wpisz numer twojego zamówienia" class="w-full max-w-[400px]">
				<UInput placeholder="np. 1w231f" v-model="state.id" />
			</UFormGroup>

			<UButton type="submit" label="Sprawdź" class="mt-[8px]" />
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/store/orderStore'

const storeOrder = useOrderStore()

const state = reactive({
	id: '',
})

const onSubmit = () => {
	console.log('object')
}

onMounted(() => {
	storeOrder.fetchProducts()
})
</script>

<style scoped></style>
