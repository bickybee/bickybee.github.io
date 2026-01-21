import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

export function Footer(){

    return (
        <footer className={styles.footer}>
            <div className={styles.left}>&copy; 2026 Vicky Bilbily. Built with React and Paper.js!</div>
            <div className={styles.right}>
                <a href="https://www.linkedin.com/in/vickybilbily/" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} className="fa-2xl"/></a>
                <a href="https://github.com/bickybee" title="GitHub"><FontAwesomeIcon icon={faGithub} className="fa-2xl" /></a>
                <a href="https://www.instagram.com/bickydoodles" title="Instagram (for art)"><FontAwesomeIcon icon={faInstagram} className="fa-2xl"/> </a>
            </div>
        </footer>
    )
}