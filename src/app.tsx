import { ButtonShowcase } from "@/components/button-showcase";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background-primary text-text-primary">
        <header className="border-b border-border-primary bg-background-primary p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-brand-primary">We Move</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="container mx-auto p-4">
          <ButtonShowcase />
        </main>
      </div>
    </ThemeProvider>
  )
}