import { Input } from "./index"
import {
    FiMail,
    FiEye,
    FiEyeOff,
    FiSearch,
    FiUser,
    FiPhone,
    FiDollarSign,
    FiCalendar,
    FiLock
} from "react-icons/fi"
import { useState } from "react"

export function InputShowcase() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="space-y-8 p-6">
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Input Components</h2>

                {/* Basic Inputs */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Basic Inputs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                        />
                        <Input
                            label="Phone"
                            placeholder="(11) 99999-9999"
                            type="tel"
                        />
                    </div>
                </div>

                {/* Inputs with Icons */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Inputs with Icons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            label="Email"
                            placeholder="olivia@gmail.com"
                            type="email"
                            leftIcon={<FiMail size={16} />}
                        />
                        <Input
                            label="Search"
                            placeholder="Search..."
                            leftIcon={<FiSearch size={16} />}
                        />
                        <Input
                            label="User"
                            placeholder="Username"
                            leftIcon={<FiUser size={16} />}
                        />
                        <Input
                            label="Phone"
                            placeholder="+55 (11) 99999-9999"
                            type="tel"
                            leftIcon={<FiPhone size={16} />}
                        />
                        <Input
                            label="Amount"
                            placeholder="100.00"
                            type="number"
                            leftIcon={<FiDollarSign size={16} />}
                        />
                        <Input
                            label="Date"
                            type="date"
                            leftIcon={<FiCalendar size={16} />}
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Password Input</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            leftIcon={<FiLock size={16} />}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </button>
                            }
                        />
                    </div>
                </div>

                {/* Input States */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Input States</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            label="Default"
                            placeholder="Default state"
                            hint="This is a hint text to help user."
                        />
                        <Input
                            label="Error"
                            placeholder="Enter valid email"
                            variant="error"
                            error="This is not a valid email."
                        />
                        <Input
                            label="Disabled"
                            placeholder="Disabled input"
                            disabled
                            hint="This input is disabled."
                        />
                    </div>
                </div>

                {/* Input Sizes */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Input Sizes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Small"
                            placeholder="Small input"
                            size="sm"
                        />
                        <Input
                            label="Medium"
                            placeholder="Medium input"
                            size="md"
                        />
                        <Input
                            label="Large"
                            placeholder="Large input"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
