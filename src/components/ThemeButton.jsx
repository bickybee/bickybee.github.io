import { useContext } from "react"
import { ThemeContext } from "../App.jsx"
import { THEMES, THEME_NAMES } from "../data/constants.ts"
import styles from './themeButton.module.css'

export function ThemeButton() {
    let {theme, setTheme} = useContext(ThemeContext);
    const numThemes = Object.keys(THEMES).length;

    function handleClick() {
        setTheme(prevTheme => (prevTheme + 1) % numThemes);
    }

    return (
        <button className={styles.themeButton + " button"} onClick={handleClick}>{THEME_NAMES[theme]}</button>
    )
}