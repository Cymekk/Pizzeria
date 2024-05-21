<template>
	<URadioGroup v-model="selected" legend="Wybierz sposób dostawy" :options="options" class="my-[16px]" />
	<UForm :schema="schema" :state="state" @submit="onSubmit">
		<div class="form space-y-[12px]" v-if="selected === 1">
			<UFormGroup label="Adres email:" name="email">
				<UInput type="email" v-model="state.email" />
			</UFormGroup>

			<UFormGroup label="Miejscowość" name="city">
				<UInput v-model="state.city" />
			</UFormGroup>
			<UFormGroup label="Ulica" name="street">
				<UInput v-model="state.street" />
			</UFormGroup>
			<UFormGroup label="Numer Domu\Bloku" name="homeNumber">
				<UInput type="number" v-model="state.homeNumber" />
			</UFormGroup>
			<UFormGroup label="Numer Mieszkania" name="flatNumber">
				<UInput type="number" v-model="state.flatNumber" />
			</UFormGroup>
		</div>

		<div class="buttons flex justify-end space-x-[8px] my-[16px]">
			<UButton label="Wstecz" @click="$emit('prevView')" />
			<UButton type="submit" label="Zamów" v-if="selected === 1" :loading="isLoading" />
			<UButton v-else label="Zamów" @click="saveOrder()" :disabled="selected === undefined" />
		</div>
	</UForm>

	<OrderModalComponent v-model="isOpen" :id="id" />
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useOrderStore } from '~/store/orderStore'

const orderStore = useOrderStore()
const id = computed(() => {
	return orderStore.id
})

const isLoading = computed(() => {
	return orderStore.isLoading
})

const emit = defineEmits(['prevView'])

const schema = z.object({
	email: z.string().email('Niepoprawny adres email'),
	city: z.string().min(3, 'Miejscowość powinna zawierać conajmniej 3 znaki'),
	street: z.string().min(3, 'Ulica powinna zawierać conajmniej 3 znaki'),
	homeNumber: z.number().gte(1).lte(1000),
	flatNumber: z.number().or(z.literal('')),
})

const state = reactive({
	email: '',
	city: '',
	street: '',
	homeNumber: '',
	flatNumber: '',
})

const initialState = reactive({
	email: '',
	city: '',
	street: '',
	homeNumber: '',
	flatNumber: '',
})

const options = [
	{
		value: 0,
		label: 'Odbiór osobisty',
	},
	{
		value: 1,
		label: 'Dostawa do domu',
	},
]

const onSubmit = () => {
	saveOrder()
}

const saveOrder = () => {
	orderStore.saveOrder(selected.value, state)
	isOpen.value = true
	Object.assign(state, initialState)
}

const selected = ref()

const isOpen = ref(false)
</script>

<style scoped></style>
