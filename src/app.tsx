import { ComponentShowcase } from "@/components/component-showcase";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b border-gray-200 bg-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-brand-600">We Move</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="container mx-auto p-4">
          <ComponentShowcase />
        </main>
      </div>
    </ThemeProvider>
  )
}