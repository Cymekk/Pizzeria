<template>
	<URadioGroup v-model="selected" legend="Wybierz sposób dostawy" :options="options" class="my-[16px]" />
	<UForm :schema="schema" :state="state" @submit="onSubmit">
		<div class="form space-y-[12px]" v-if="selected === 1">
			<UFormGroup label="Numer Telefonu:" name="phoneNumber">
				<UInput type="number" v-model="state.phoneNumber" />
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
			<UButton type="submit" label="Zamów" v-if="selected === 1" />
			<UButton v-else label="Zamów" @click="saveOrder()" />
		</div>
	</UForm>
</template>

<script setup>
import { z } from 'zod'
import { useOrderStore } from '~/store/orderStore'
import { useCartStore } from '~/store/cartStore'

const supabase = useSupabaseClient()
const orderStore = useOrderStore()
const cartStore = useCartStore()

const emit = defineEmits(['prevView'])

const schema = z.object({
	phoneNumber: z
		.number({ message: 'Pole Nume Telefonu jest wymagane' })
		.gte(100000000, 'Numer telefonu powinien składać się z 9 cyfr')
		.lte(999999999, 'Numer telefonu powinien składać się z 9 cyfr'),
	city: z.string().min(3, 'Miejscowość powinna zawierać conajmniej 3 znaki'),
	street: z.string().min(3, 'Ulica powinna zawierać conajmniej 3 znaki'),
	homeNumber: z.number().gte(1).lte(1000),
	flatNumber: z.number().or(z.literal('')),
})

const state = reactive({
	phoneNumber: '',
	city: '',
	street: '',
	homeNumber: '',
	flatNumber: '',
})

const onSubmit = () => {
	console.log('hej')
}

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

const saveOrder = () => {
	orderStore.saveOrder(selected.value)
}

const selected = ref()
</script>

<style scoped></style>
