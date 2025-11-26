import { ThemeProvider } from "@/lib/theme-provider";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
    return (
        <ThemeProvider defaultTheme="light">
            <AppRoutes />
        </ThemeProvider>
    )
}