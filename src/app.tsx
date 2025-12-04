import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
    return (
        <ThemeProvider defaultTheme="light">
            <AppRoutes />
            <Toaster />
        </ThemeProvider>
    )
}