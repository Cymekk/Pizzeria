<template>
	<div class="my-[16px] flex items-center justify-center gap-x-[12px] text-[16px]">
		<span
			:class="{ 'border-b-2 border-gray-700 dark:border-gray-200': selectedMenu === 'Pizza' }"
			@click="selectedMenu = 'Pizza'"
			>Pizze</span
		>
		<span
			:class="{ 'border-b-2 border-gray-700 dark:border-gray-200': selectedMenu === 'Pasta' }"
			@click="selectedMenu = 'Pasta'"
			>Makarony</span
		>
		<span
			:class="{ 'border-b-2 border-gray-700 dark:border-gray-200': selectedMenu === 'Drinks' }"
			@click="selectedMenu = 'Drinks'"
			>Napoje</span
		>
	</div>

	<div class="pizza-menu" v-if="selectedMenu === 'Pizza'">
		<ProductComponent v-for="(item, index) in pizzaMenu" :key="index" :product="item" />
	</div>

	<div class="pasta-menu" v-if="selectedMenu === 'Pasta'">
		<ProductComponent v-for="(item, index) in pastaMenu" :key="index" :product="item" />
	</div>

	<div class="drinks-menu" v-if="selectedMenu === 'Drinks'">
		<ProductComponent v-for="(item, index) in drinkMenu" :key="index" :product="item" />
	</div>
</template>

<script setup>
import { drinkMenu, pizzaMenu, pastaMenu } from '~/constants.js'

const selectedMenu = ref('Pizza')
</script>

<style lang="scss" scoped></style>
