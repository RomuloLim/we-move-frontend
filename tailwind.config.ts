import type { Config } from 'tailwindcss'
import { themeTokens } from './src/lib/theme'

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Cores base
                white: themeTokens.colors.base.white,
                black: themeTokens.colors.base.black,

                // Paleta da marca
                brand: themeTokens.colors.brand,

                // Estados
                error: themeTokens.colors.error,
                success: themeTokens.colors.success,
                warning: themeTokens.colors.warning,

                // Cinza claro
                gray: themeTokens.colors.gray,

                // Cinza escuro para modo escuro
                'gray-dark': themeTokens.colors.grayDark,

                // Cores semânticas usando CSS custom properties
                text: {
                    primary: 'var(--color-text-don-t-edit-text-primary)',
                    secondary: 'var(--color-text-don-t-edit-text-secondary)',
                    tertiary: 'var(--color-text-don-t-edit-text-tertiary)',
                    quaternary: 'var(--color-text-don-t-edit-text-quarterary)',
                    white: 'var(--color-text-don-t-edit-text-white)',
                    disabled: 'var(--color-text-don-t-edit-text-disable)',
                    placeholder: 'var(--color-text-don-t-edit-text-placeholder)',
                    brand: {
                        primary: 'var(--color-text-don-t-edit-text-brand-primary)',
                        secondary: 'var(--color-text-don-t-edit-text-brand-secondary)',
                        tertiary: 'var(--color-text-don-t-edit-text-brand-tertiary)',
                    },
                    error: 'var(--color-text-don-t-edit-text-error-primary)',
                    warning: 'var(--color-text-don-t-edit-text-warning-primary)',
                    success: 'var(--color-text-don-t-edit-text-success-primary)',
                },

                background: {
                    primary: 'var(--color-background-don-t-edit-gray-bg-primary)',
                    secondary: 'var(--color-background-don-t-edit-gray-bg-secondary)',
                    tertiary: 'var(--color-background-don-t-edit-gray-bg-tertiary)',
                    quaternary: 'var(--color-background-don-t-edit-gray-bg-quarterary)',
                    disabled: 'var(--color-background-don-t-edit-gray-bg-disabled)',
                    overlay: 'var(--color-background-don-t-edit-gray-bg-overlay)',
                    brand: {
                        primary: 'var(--color-background-don-t-edit-brand-bg-brand-primary)',
                        secondary: 'var(--color-background-don-t-edit-brand-bg-brand-secondary)',
                        solid: 'var(--color-background-don-t-edit-brand-bg-brand-solid)',
                    },
                    error: {
                        primary: 'var(--color-background-don-t-edit-error-bg-error-primary)',
                        solid: 'var(--color-background-don-t-edit-error-bg-error-solid)',
                    },
                    success: {
                        primary: 'var(--color-background-don-t-edit-success-bg-ssuccess-primary)',
                        solid: 'var(--color-background-don-t-edit-success-bg-ssuccess-solid)',
                    },
                    warning: {
                        primary: 'var(--color-background-don-t-edit-warning-bg-warning-primary)',
                        solid: 'var(--color-background-don-t-edit-warning-bg-warning-solid)',
                    },
                },

                border: {
                    primary: 'var(--color-border-don-t-edit-border-primary)',
                    secondary: 'var(--color-border-don-t-edit-border-secondary)',
                    tertiary: 'var(--color-border-don-t-edit-border-tertiary)',
                    disabled: 'var(--color-border-don-t-edit-border-disabled)',
                    brand: 'var(--color-border-don-t-edit-border-brand)',
                    error: 'var(--color-border-don-t-edit-border-error)',
                },
            },

            fontFamily: {
                sans: themeTokens.typography.fontFamily.sans,
                mono: themeTokens.typography.fontFamily.mono,
            },

            fontSize: themeTokens.typography.fontSize,
            fontWeight: themeTokens.typography.fontWeight,

            spacing: themeTokens.spacing,
            borderRadius: themeTokens.borderRadius,
            boxShadow: themeTokens.boxShadow,

            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'fade-out': 'fadeOut 0.2s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'scale-out': 'scaleOut 0.2s ease-in',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scaleOut: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}

export default config
