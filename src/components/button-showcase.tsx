import { Button } from "@/components/ui/button"
import { ColorShowcase } from "@/components/color-showcase"

export function ButtonShowcase() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Sistema de Design We Move</h1>
                <p className="text-text-secondary mb-8">
                    Demonstração do sistema de cores e componentes baseado nos tokens de design
                </p>

                {/* Color Showcase */}
                <ColorShowcase />
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-6">Componentes de Botão</h2>

                {/* Primary Buttons */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-xl font-medium text-text-primary">Botões Primários</h3>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="primary" size="sm">Button CTA</Button>
                        <Button variant="primary" size="md">Button CTA</Button>
                        <Button variant="primary" size="lg">Button CTA</Button>
                        <Button variant="primary" size="xl">Button CTA</Button>
                        <Button variant="primary" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Secondary Buttons */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-xl font-medium text-text-primary">Botões Secundários</h3>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="secondary" size="sm">Button CTA</Button>
                        <Button variant="secondary" size="md">Button CTA</Button>
                        <Button variant="secondary" size="lg">Button CTA</Button>
                        <Button variant="secondary" size="xl">Button CTA</Button>
                        <Button variant="secondary" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Secondary Color Buttons */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-xl font-medium text-text-primary">Botões Secundários com Cor</h3>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="secondary-color" size="sm">Button CTA</Button>
                        <Button variant="secondary-color" size="md">Button CTA</Button>
                        <Button variant="secondary-color" size="lg">Button CTA</Button>
                        <Button variant="secondary-color" size="xl">Button CTA</Button>
                        <Button variant="secondary-color" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Tertiary Buttons */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-xl font-medium text-text-primary">Botões Terciários</h3>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="tertiary" size="sm">Button CTA</Button>
                        <Button variant="tertiary" size="md">Button CTA</Button>
                        <Button variant="tertiary" size="lg">Button CTA</Button>
                        <Button variant="tertiary" size="xl">Button CTA</Button>
                        <Button variant="tertiary" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Tertiary Color Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Tertiary Color Buttons</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="tertiary-color" size="sm">Button CTA</Button>
                        <Button variant="tertiary-color" size="md">Button CTA</Button>
                        <Button variant="tertiary-color" size="lg">Button CTA</Button>
                        <Button variant="tertiary-color" size="xl">Button CTA</Button>
                        <Button variant="tertiary-color" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Quaternary Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Quaternary Buttons</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="quaternary" size="sm">Button CTA</Button>
                        <Button variant="quaternary" size="md">Button CTA</Button>
                        <Button variant="quaternary" size="lg">Button CTA</Button>
                        <Button variant="quaternary" size="xl">Button CTA</Button>
                        <Button variant="quaternary" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Quaternary Color Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Quaternary Color Buttons</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="quaternary-color" size="sm">Button CTA</Button>
                        <Button variant="quaternary-color" size="md">Button CTA</Button>
                        <Button variant="quaternary-color" size="lg">Button CTA</Button>
                        <Button variant="quaternary-color" size="xl">Button CTA</Button>
                        <Button variant="quaternary-color" size="2xl">Button CTA</Button>
                    </div>
                </section>

                {/* Destructive Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Destructive Buttons</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-600">Primary</h3>
                            <Button variant="destructive" size="md">Button CTA</Button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-600">Secondary</h3>
                            <Button variant="destructive-secondary" size="md">Button CTA</Button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-600">Tertiary</h3>
                            <Button variant="destructive-tertiary" size="md">Button CTA</Button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-600">Quaternary</h3>
                            <Button variant="destructive-quaternary" size="md">Button CTA</Button>
                        </div>
                    </div>
                </section>

                {/* Icon Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Icon Buttons</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <Button variant="primary" size="icon-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </Button>
                        <Button variant="primary" size="icon-md">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </Button>
                        <Button variant="primary" size="icon-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </Button>
                        <Button variant="primary" size="icon-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </Button>
                        <Button variant="primary" size="icon-2xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </Button>
                    </div>
                </section>

                {/* Disabled State */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Disabled State</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <Button disabled size="sm">Button CTA</Button>
                        <Button disabled size="md">Button CTA</Button>
                        <Button disabled size="lg">Button CTA</Button>
                        <Button disabled size="xl">Button CTA</Button>
                        <Button disabled size="2xl">Button CTA</Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
