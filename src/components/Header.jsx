import styles from './header.module.css';
import { ThemeButton } from './components.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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
                <div className={styles.links + (isHamburgerOpen ? ' ' + styles.active : '')}>
                    <Link to="/" className={styles.linkPink} onClick={onLinkClick}>
                        Home
                    </Link>
                    <div className={styles.linkBlue} onClick={onLinkClick}>
                        <Link to="/about">About</Link>
                    </div>
                    <div className={styles.linkOrange} onClick={onLinkClick}>
                        <a href="Vicky_Bilbily_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                    </div>
                    <div className={styles.linkGreen}>
                        <ThemeButton />
                    </div>
                </div>
                <div className={styles.hamburger} onClick={onHamburgerClick}>
                    <div></div>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </header>
    )
}