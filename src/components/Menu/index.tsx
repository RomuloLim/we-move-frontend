import { type ReactNode } from "react";

import { NavLink } from "react-router-dom";

type MenuProps = {
    children: ReactNode;
}

type MenuItemProps = {
    to?: string;
    icon: ReactNode;
    label?: string;
    onClick?: () => void;
    renderCustom?: (props: { isActive: boolean }) => ReactNode;
    disabled?: boolean;
}

function Menu({ children }: MenuProps) {
    return (
        <nav className="fixed bottom-0 flex w-full bg-white py-1 rounded-t-2xl pb-6 drop-shadow-[0_-2px_2px_rgba(0,0,0,0.1)]">
            {children}
        </nav>
    )
}

function MenuItem({ to, icon, label, onClick, renderCustom, disabled = false }: MenuItemProps) {
    if (renderCustom) {
        return renderCustom({ isActive: false })
    }

    if (disabled && !to && !onClick) {
        return (
            <div className="flex flex-col items-center justify-end flex-1 px-2 opacity-50 cursor-not-allowed">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-700">
                    {icon}
                </div>
                {label && (
                    <div className="text-sm font-bold mt-1 text-center text-gray-600">
                        {label}
                    </div>
                )}
            </div>
        )
    }

    if (onClick && !to) {
        return (
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`flex flex-col items-center justify-end flex-1 px-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'text-gray-700'}`}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-700">
                    {icon}
                </div>
                {label && (
                    <div className="text-sm font-bold mt-1 text-center text-gray-600">
                        {label}
                    </div>
                )}
            </button>
        )
    }

    if (!to) {
        return null
    }

    if (disabled) {
        return (
            <div className="flex flex-col items-center justify-end flex-1 px-2 opacity-50 cursor-not-allowed">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-700">
                    {icon}
                </div>
                {label && (
                    <div className="text-sm font-bold mt-1 text-center text-gray-600">
                        {label}
                    </div>
                )}
            </div>
        )
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex flex-col items-center justify-end flex-1 px-2 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
        >
            {({ isActive }) => (
                <>
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ease-out ${isActive ? 'bg-blue-600 text-white -translate-y-4 shadow-md' : 'text-gray-700 translate-y-0'}`}
                    >
                        {icon}
                    </div>
                    {label && (
                        <div className={`text-sm font-bold mt-1 text-center transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                            {label}
                        </div>
                    )}
                </>
            )}
        </NavLink>
    )
}

Menu.Item = MenuItem;

export { Menu };