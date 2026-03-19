import { useContext } from "react"
import { ThemeContext } from "../../App"
import { THEMES, THEME_NAMES } from "../../data/constants"
import styles from './themeButton.module.css'

export function ThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);
    const numThemes = Object.keys(THEMES).length;

    function handleClick() {
        setTheme(prevTheme => (prevTheme + 1) % numThemes);
    }

    return (
        <button className={styles.themeButton + " button"} onClick={handleClick}>{THEME_NAMES[theme]}</button>
    )
}