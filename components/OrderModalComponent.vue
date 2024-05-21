<template>
	<UModal class="justify-center items-center">
		<div class="p-4 flex flex-col items-center gap-y-[12px]">
			<h2 class="text-[20px]">Złożone zamówienia</h2>

			<p class="text">
				Dziękujemy za złożenie zamówienia, postaramy się przygotować twoje zamówienia jak najszybciej. Numer twojego
				zamówienia to <span class="font-semibold">{{ id }}</span>, status twojego zamówienia możesz sprawdzić
				<NuxtLink to="/checkOrder" class="font-bold"> tutaj</NuxtLink>
			</p>

			<UButton label="Zamknij" @click="emit('update:modelValue', false)" />
		</div>
	</UModal>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	id: {
		type: String,
	},
})
</script>

<style lang="scss" scoped></style>
