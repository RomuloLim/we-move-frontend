import { Textarea } from "./index"
import { useState } from "react"

export function TextareaShowcase() {
    const [textareaValue, setTextareaValue] = useState("")

    return (
        <div className="space-y-8 p-6">
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Textarea Components</h2>

                {/* Basic Textareas */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Basic Textareas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            label="Description"
                            placeholder="Enter a description..."
                            hint="This is a hint text to help user."
                        />
                        <Textarea
                            label="Comments"
                            placeholder="Add your comments..."
                        />
                    </div>
                </div>

                {/* Textarea with Character Count */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Textarea with Character Count</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            label="Limited Description"
                            placeholder="Describe in 200 characters..."
                            maxLength={200}
                            showCharCount
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                            hint="Maximum 200 characters."
                        />
                    </div>
                </div>

                {/* Textarea States */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Textarea States</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Textarea
                            label="Default"
                            placeholder="Default state"
                            hint="This is a hint text to help user."
                        />
                        <Textarea
                            label="Error"
                            placeholder="Enter valid content"
                            variant="error"
                            error="This field is required."
                        />
                        <Textarea
                            label="Disabled"
                            placeholder="Disabled textarea"
                            disabled
                            hint="This textarea is disabled."
                        />
                    </div>
                </div>

                {/* Textarea Sizes */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-700">Textarea Sizes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Textarea
                            label="Small"
                            placeholder="Small textarea"
                            size="sm"
                        />
                        <Textarea
                            label="Medium"
                            placeholder="Medium textarea"
                            size="md"
                        />
                        <Textarea
                            label="Large"
                            placeholder="Large textarea"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
