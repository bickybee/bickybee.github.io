import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './home.module.css'
import { FilterNavigation, ProjectCardsContainer } from '../components/components.js';


export function HomePage(props) {

  const filter = useOutletContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.hero}>
        <div className={styles.title}>Vicky Bilbily</div>
        <div className={styles.subtitle}>Building delightful experiences through human-centred engineering.</div>
        <FilterNavigation filter={filter} />
      </div>
      <ProjectCardsContainer filter={filter} />
    </div>
  )
}