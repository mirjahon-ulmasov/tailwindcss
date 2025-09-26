import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "../contexts/themeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggle() {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}