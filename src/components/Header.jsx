import styles from './header.module.css';
import { ThemeButton } from './components.js';
import { Link } from 'react-router-dom';

export function Header(props){

    return (
        <header className={styles.header}>
            <Link to="/"><img src="/logo2.png" alt="Vicky Bilbily Logo" width="200px" className={styles.logo} id="logo"/></Link>
            <div className={styles.right}>
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
                <Link to="/">Resume</Link>
                <ThemeButton />
            </div>
        </header>
    )
}