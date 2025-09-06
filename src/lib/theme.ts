/**
 * Tokens de design para o tema da aplicação We Move
 * Baseado na paleta de cores gerada pelo Zeplin
 */

export const themeTokens = {
    // Cores base
    colors: {
        base: {
            white: '#ffffff',
            black: '#000000',
        },

        // Paleta principal da marca
        brand: {
            25: '#f5faff',
            50: '#eff8ff',
            100: '#d1e9ff',
            200: '#b2ddff',
            300: '#84caff',
            400: '#53b1fd',
            500: '#2e90fa',
            600: '#1570ef',
            700: '#175cd3',
            800: '#1849a9',
            900: '#194185',
            950: '#102a56',
        },

        // Estados de feedback
        error: {
            25: '#fffbfa',
            50: '#fef3f2',
            100: '#fae5e2',
            200: '#fecfca',
            300: '#fda29b',
            400: '#f97066',
            500: '#f04438',
            600: '#d92d20',
            700: '#b42318',
            800: '#912018',
            900: '#7a271a',
            950: '#55160c',
        },

        success: {
            25: '#f6fef9',
            50: '#ecfdf3',
            100: '#dcfae6',
            200: '#abefc6',
            300: '#75e0a7',
            400: '#47cd89',
            500: '#17b26a',
            600: '#079455',
            700: '#067647',
            800: '#085d3a',
            900: '#074d31',
            950: '#053321',
        },

        warning: {
            25: '#fffcf5',
            50: '#fffaeb',
            100: '#fef0c7',
            200: '#fedf89',
            300: '#fec84b',
            400: '#fdb022',
            500: '#f79009',
            600: '#dc6803',
            700: '#b54708',
            800: '#93370d',
            900: '#7a2e0e',
            950: '#4e1d09',
        },

        // Tons de cinza (tema claro)
        gray: {
            25: '#fcfcfd',
            50: '#f9fafb',
            100: '#f2f4f7',
            200: '#eaecf0',
            300: '#d0d5dd',
            400: '#98a2b3',
            500: '#667085',
            600: '#475467',
            700: '#344054',
            800: '#182230',
            900: '#101828',
            950: '#0c111d',
        },

        // Tons de cinza escuro (tema escuro)
        grayDark: {
            25: '#fcfcfc',
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d1d1d6',
            400: '#a0a0ab',
            500: '#70707b',
            600: '#51525c',
            700: '#3f3f46',
            800: '#26272b',
            900: '#1a1a1e',
            950: '#131316',
        },
    },

    // Espaçamentos
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
    },

    // Tipografia
    typography: {
        fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        },

        fontSize: {
            xs: ['12px', { lineHeight: '16px' }],
            sm: ['14px', { lineHeight: '20px' }],
            base: ['16px', { lineHeight: '24px' }],
            lg: ['18px', { lineHeight: '28px' }],
            xl: ['20px', { lineHeight: '28px' }],
            '2xl': ['24px', { lineHeight: '32px' }],
            '3xl': ['30px', { lineHeight: '36px' }],
            '4xl': ['36px', { lineHeight: '40px' }],
            '5xl': ['48px', { lineHeight: '1' }],
        },

        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    // Bordas e raios
    borderRadius: {
        none: '0px',
        sm: '2px',
        base: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
    },

    // Sombras
    boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    },
}

// Tokens semânticos para diferentes contextos
export const semanticTokens = {
    // Cores de texto
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

    // Cores de background
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

    // Cores de borda
    border: {
        primary: 'var(--color-border-don-t-edit-border-primary)',
        secondary: 'var(--color-border-don-t-edit-border-secondary)',
        tertiary: 'var(--color-border-don-t-edit-border-tertiary)',
        disabled: 'var(--color-border-don-t-edit-border-disabled)',
        brand: 'var(--color-border-don-t-edit-border-brand)',
        error: 'var(--color-border-don-t-edit-border-error)',
    },
}

export type ThemeTokens = typeof themeTokens
export type SemanticTokens = typeof semanticTokens
