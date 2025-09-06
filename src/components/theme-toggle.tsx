import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../lib/theme-provider'
import { Button } from './Button'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const handleThemeChange = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else if (theme === 'dark') {
            setTheme('system')
        } else {
            setTheme('light')
        }
    }

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun className="h-4 w-4" />
            case 'dark':
                return <Moon className="h-4 w-4" />
            case 'system':
                return <Monitor className="h-4 w-4" />
            default:
                return <Sun className="h-4 w-4" />
        }
    }

    const getLabel = () => {
        switch (theme) {
            case 'light':
                return 'Modo claro'
            case 'dark':
                return 'Modo escuro'
            case 'system':
                return 'Modo sistema'
            default:
                return 'Alterar tema'
        }
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleThemeChange}
            aria-label={getLabel()}
            className="relative"
        >
            {getIcon()}
            <span className="sr-only">{getLabel()}</span>
        </Button>
    )
}
