import styles from './header.module.css';
import { ThemeButton } from './ThemeButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { encodePublicAssetPath } from '../../lib/imageUrls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Header() {

    const [isHamburgerOpen, setHamburgerOpen] = useState(false);
    function onHamburgerClick() {
        setHamburgerOpen(!isHamburgerOpen);
    }

    function onLinkClick() {
        setTimeout(() => {
            setHamburgerOpen(false)
        }, 10);
    }

    return (
        <header className={styles.header}>
            <div className={styles.clickable}>
                <Link to="/">
                    <img
                        id="logo"
                        src={encodePublicAssetPath('/media/logo.png')}
                        alt="Vicky Bilbily Logo"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                </Link>
            </div>
            <div className={styles.right}>
                <div className={styles.links + (isHamburgerOpen ? ' ' + styles.active : '')}>
                    <Link to="/" className={styles.linkPink} onClick={onLinkClick}>
                        Home
                    </Link>
                    <Link to="/about" className={styles.linkBlue} onClick={onLinkClick}>
                        About
                    </Link>
                    <a href="/media/Vicky_Bilbily_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.linkOrange} onClick={onLinkClick}>
                        Resume
                    </a>
                    <div className={styles.linkGreen}>
                        <ThemeButton />
                    </div>
                </div>
                <div className={styles.hamburger} onClick={onHamburgerClick}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </header>
    )
}