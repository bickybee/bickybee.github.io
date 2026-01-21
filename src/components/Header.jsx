import styles from './header.module.css';
import { ThemeButton } from './components.js';
import { Link } from 'react-router-dom';

export function Header(props){

    return (
        <header className={styles.header}>
            <div className={styles.clickable}>
                <Link to="/"><img src="/logo2.png" alt="Vicky Bilbily Logo" width="200px" id="logo"/></Link>
            </div>
            <div className={styles.right}>
                <div className={styles.clickable}>
                    <Link to="/" className={styles.clickable}>Home</Link>
                </div>
                <Link to="/about">About</Link>
                <Link to="/">Contact</Link>
                <a href="Vicky_Bilbily_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                <ThemeButton />
            </div>
        </header>
    )
}