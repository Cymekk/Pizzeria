<template>
	<NavbarComponent />

	<div class="px-4 py-2">
		<UForm :schema="schema" :state="state" @submit="onSubmit" class="mt-[16px] flex flex-col items-center">
			<UFormGroup
				class="w-full max-w-[400px] text-center"
				label="Wprowadź numer identyfikacyjny twojego zamówienia"
				name="id"
			>
				<UInput v-model="state.id" placeholder="eg: 123sefiu2" />
			</UFormGroup>

			<UButton type="submit" label="Sprawdź" class="mt-[8px]" />
		</UForm>

		<p v-if="status !== ''" class="text-center mt-[16px] text-green-500">
			Status twojego zamówienia to: <span class="font-semibold">{{ status }}</span>
		</p>
	</div>
</template>

<script setup lang="ts">
//imports
import { z } from 'zod'

const { toastError } = useAppToast()

let orders: any[] | null = []
const supabase = useSupabaseClient()
try {
	const { data } = await useAsyncData('orders', async () => {
		const { data, error } = await supabase.from('orders').select()

		if (error) return []

		return data
	})

	orders = data.value
} finally {
}

const schema = z.object({
	id: z.string().length(8, 'ID składa sie z 8 znaków'),
})

const state = reactive({
	id: '',
})

let status: any = ref('')

const onSubmit = () => {
	let statusObj = orders?.find(el => {
		return el.id === state.id
	})

	if (statusObj) {
		status.value = statusObj.status
	} else {
		status.value = ''
		toastError('Błąd', 'brak zamówienia o podanym numerze ID')
	}
}
</script>

<style scoped></style>
