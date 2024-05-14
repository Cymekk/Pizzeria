<template>
	<div>
		<UButton color="gray" variant="ghost" icon="i-heroicons-bars-3-solid" @click="isOpen = true" />

		<USlideover v-model="isOpen">
			<div class="p-4 h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-x-mark-20-solid"
					class="absolute top-0 right-0"
					@click="isOpen = false"
				/>
				<ul class="uppercase flex flex-col items-center justify-center gap-y-4 font-semibold">
					<NuxtLink to="/" @click="isOpen = false">
						<li>Strona główna</li>
					</NuxtLink>
					<NuxtLink to="/menu" @click="isOpen = false"> <li>menu</li></NuxtLink>
					<li>sprawdź status zamówienia</li>
					<li>kontakt</li>
				</ul>
			</div>
		</USlideover>
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>

<style scoped></style>
