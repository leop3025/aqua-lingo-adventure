
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				ocean: {
					light: '#D3E4FD',
					DEFAULT: '#0EA5E9',
					deep: '#075985',
					ultraLight: '#F0F7FF',
					medium: '#38BDF8',
					darkest: '#0C4A6E'
				},
				coral: {
					light: '#FEF2F2',
					DEFAULT: '#FB7185',
					deep: '#BE123C',
					ultraLight: '#FFF1F2'
				},
				sand: {
					light: '#FEF9C3',
					DEFAULT: '#FDE047',
					deep: '#CA8A04',
					ultraLight: '#FEFCE8'
				},
				azure: {
					light: '#E0F2FE',
					DEFAULT: '#7DD3FC',
					deep: '#0369A1'
				},
				cerulean: {
					light: '#DBEAFE',
					DEFAULT: '#3B82F6',
					deep: '#1E40AF'
				},
				indigo: {
					light: '#E0E7FF',
					DEFAULT: '#6366F1',
					deep: '#4338CA'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'wave': {
					'0%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(-25%)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'bubble-rise': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateY(-100%)', opacity: '0' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'wave': 'wave 15s linear infinite',
				'bubble-rise': 'bubble-rise 8s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'rotate-slow': 'rotate-slow 10s linear infinite'
			},
			backgroundImage: {
				'ocean-gradient': 'linear-gradient(180deg, #E0F2FE 0%, #0EA5E9 100%)',
				'azure-gradient': 'linear-gradient(180deg, #E0F2FE 0%, #7DD3FC 100%)',
				'cerulean-gradient': 'linear-gradient(180deg, #DBEAFE 0%, #3B82F6 100%)',
				'ocean-radial': 'radial-gradient(circle at 50% 50%, #0EA5E9 0%, #075985 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
				'underwater-light': 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
				'blue-wave': 'linear-gradient(90deg, #D3E4FD 0%, #0EA5E9 50%, #075985 100%)'
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
				'neon': '0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
				'elegant': '0 10px 25px -5px rgba(7, 89, 133, 0.1), 0 8px 10px -6px rgba(7, 89, 133, 0.1)',
				'depth': '0 10px 15px -3px rgba(7, 89, 133, 0.2), 0 4px 6px -4px rgba(7, 89, 133, 0.2)'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						a: {
							textDecoration: 'none',
							fontWeight: '500',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
					},
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
