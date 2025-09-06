import { themeTokens } from "@/lib/theme"

export function ColorShowcase() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Paleta de Cores da Marca</h2>
                <div className="grid grid-cols-5 gap-2 mb-6">
                    {Object.entries(themeTokens.colors.brand).map(([shade, color]) => (
                        <div key={shade} className="text-center">
                            <div
                                className="h-16 w-full rounded-md border border-border-primary mb-2"
                                style={{ backgroundColor: color }}
                            />
                            <p className="text-xs text-text-secondary">brand-{shade}</p>
                            <p className="text-xs text-text-tertiary">{color}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Estados de Feedback</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Success */}
                    <div>
                        <h3 className="text-lg font-medium text-text-primary mb-3">Success</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {[50, 500, 600].map((shade) => (
                                <div key={shade} className="text-center">
                                    <div
                                        className="h-12 w-full rounded-md border border-border-primary mb-2"
                                        style={{ backgroundColor: themeTokens.colors.success[shade as keyof typeof themeTokens.colors.success] }}
                                    />
                                    <p className="text-xs text-text-secondary">success-{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warning */}
                    <div>
                        <h3 className="text-lg font-medium text-text-primary mb-3">Warning</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {[50, 500, 600].map((shade) => (
                                <div key={shade} className="text-center">
                                    <div
                                        className="h-12 w-full rounded-md border border-border-primary mb-2"
                                        style={{ backgroundColor: themeTokens.colors.warning[shade as keyof typeof themeTokens.colors.warning] }}
                                    />
                                    <p className="text-xs text-text-secondary">warning-{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    <div>
                        <h3 className="text-lg font-medium text-text-primary mb-3">Error</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {[50, 500, 600].map((shade) => (
                                <div key={shade} className="text-center">
                                    <div
                                        className="h-12 w-full rounded-md border border-border-primary mb-2"
                                        style={{ backgroundColor: themeTokens.colors.error[shade as keyof typeof themeTokens.colors.error] }}
                                    />
                                    <p className="text-xs text-text-secondary">error-{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Escala de Cinza</h2>
                <div className="grid grid-cols-5 gap-2 mb-6">
                    {Object.entries(themeTokens.colors.gray).map(([shade, color]) => (
                        <div key={shade} className="text-center">
                            <div
                                className="h-16 w-full rounded-md border border-border-primary mb-2"
                                style={{ backgroundColor: color }}
                            />
                            <p className="text-xs text-text-secondary">gray-{shade}</p>
                            <p className="text-xs text-text-tertiary">{color}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Tokens Semânticos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Colors */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-text-primary">Cores de Texto</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-text-primary border border-border-primary" />
                                <span className="text-text-primary">Texto Primary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-text-secondary border border-border-primary" />
                                <span className="text-text-secondary">Texto Secondary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-text-tertiary border border-border-primary" />
                                <span className="text-text-tertiary">Texto Tertiary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-text-brand-primary border border-border-primary" />
                                <span className="text-text-brand-primary">Texto Brand</span>
                            </div>
                        </div>
                    </div>

                    {/* Background Colors */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-text-primary">Cores de Background</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-background-primary border border-border-primary" />
                                <span>Background Primary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-background-secondary border border-border-primary" />
                                <span>Background Secondary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-background-brand-primary border border-border-primary" />
                                <span>Background Brand</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
