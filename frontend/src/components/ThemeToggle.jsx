import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-full
        border
        border-black/10
        dark:border-white/10
        bg-white
        dark:bg-white/10
        px-4
        py-2
        text-sm
        font-medium
        text-black
        dark:text-white
        shadow-sm
        backdrop-blur-md
        transition-all
        hover:scale-105
      "
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
