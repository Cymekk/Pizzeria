<template>
	<nav class="flex items-center flex-1 justify-between p-2">
		<div class="left-side flex items-center">
			<MobileMenuComponent />
			<NuxtLink to="/">
				<h1 class="font-['Poppins']">Pizza & Pasta</h1>
			</NuxtLink>
		</div>
		<div class="right-side">
			<ColorModeComponent />
			<NuxtLink to="/cart">
				<UButton color="gray" variant="ghost" icon="i-heroicons-shopping-cart-solid" />
			</NuxtLink>
		</div>
	</nav>
</template>
