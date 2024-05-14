<template>
	<UTooltip :text="text" :popper="{ arrow: true }">
		<UButton color="gray" variant="ghost" :icon="icon" @click="changeColorMode()" />
	</UTooltip>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const icon = ref('')
const text = ref('')

onMounted(() => {
	colorMode.preference =
		localStorage.getItem('colorMode') !== null ? (localStorage.getItem('colorMode') as string) : 'light'

	icon.value =
		localStorage.getItem('icon') !== null ? (localStorage.getItem('icon') as string) : 'i-heroicons-moon-16-solid'

	text.value = localStorage.getItem('text') !== null ? (localStorage.getItem('text') as string) : 'Dark Mode'
})

const changeColorMode = (): void => {
	if (colorMode.preference === 'light') {
		colorMode.preference = 'dark'
		icon.value = 'i-heroicons-sun-16-solid'
		text.value = 'Light Mode'
	} else {
		colorMode.preference = 'light'
		icon.value = 'i-heroicons-moon-16-solid'
		text.value = 'Dark Mode'
	}

	localStorage.setItem('colorMode', colorMode.preference)
	localStorage.setItem('icon', icon.value)
	localStorage.setItem('text', text.value)
}
</script>

<style scoped></style>
