// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	typescript: {
		typeCheck: true,
	},

	modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@pinia/nuxt'],
	googleFonts: {
		families: {
			Roboto: [400, 700],
			Playfair_Display: [400, 700],
			Poppins: [400, 700],
		},
	},

	app: {
		head: {
			bodyAttrs: {
				class: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-["Roboto"]',
			},
		},
	},
})
