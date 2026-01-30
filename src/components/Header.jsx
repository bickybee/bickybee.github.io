import styles from './header.module.css';
import { ThemeButton } from './components.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header(props){

    const [isHamburgerOpen, setHamburgerOpen] = useState(false);
    function onHamburgerClick() {
        setHamburgerOpen(!isHamburgerOpen);
    }

    function onLinkClick(){
        setTimeout(() => {
            setHamburgerOpen(false)
        }, 10);
    }

    return (
        <header className={styles.header}>
            <div className={styles.clickable}>
                <Link to="/"><img src="/logo2.png" alt="Vicky Bilbily Logo" id="logo"/></Link>
            </div>
            <div className={styles.right}>
                <div className={styles.links + (isHamburgerOpen ? ' ' + styles.active : '')} onClick={onLinkClick}>
                    <Link to="/" className={styles.clickable}>Home</Link>
                    <Link to="/about">About</Link>
                    <a href="Vicky_Bilbily_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                    <ThemeButton />
                </div>
                <div className={styles.hamburger} onClick={onHamburgerClick}>
                    CLICK
                </div>
            </div>
        </header>
    )
}