/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
		extend: {
			backgroundImage: {
				spinner: "url('src/assets/spinner.gif')",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				"shake-animate": {
					"20%": { transform: "translateX(-10px)" },
					"40%": { transform: "translateX(+10px)" },
					"60%": { transform: "translateX(-5px)" },
					"80%": { transform: "translateX(+5px)" },
					"100%": { transform: "translateX(0)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"shake-animate": "shake-animate 0.3s ease-in",
			},
			colors: {
				green: "var(--green)",
				darkendGreen: "var(--darkendGreen)",
				yellow: "var(--yellow)",
				darkendYellow: "var(--darkendYellow)",
				spellingBeeYellow: "var(--spellingBeeYellow)",
				lightGray: "var(--lightGray)",
				gray: "var(--gray)",
				"gray-2": "var(--gray-2)",
				"gray-3": "var(--gray-3)",
				"gray-4": "var(--gray-4)",
				darkGray: "var(--darkGray)",
				white: "var(--white)",
				black: "var(--black)",
				"black-2": "var(--black-2)",
				"black-3": "var(--black-3)",
				"black-4": "var(--black-4)",
				"blue-2": "var(--blue-2)",
				"blue-5": "var(--blue-5)",
				orange: "var(--orange)",
				blue: "var(--blue)",
				outlineBlue: "var(--outlineBlue)",
				linkBlue: "var(--linkBlue)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
		},
	},
	plugins: [import("tailwindcss-animate")],
};
