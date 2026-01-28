import { useOutletContext } from 'react-router-dom';
import styles from './home.module.css'
import { FilterNavigation, Footer, Header, ProjectCardsContainer } from '../components/components.js';


export function HomePage(props) {

  const filter = useOutletContext();

    return (
      <div className={styles.contentWrapper}>
        <div className={styles.hero}>
          <div className={styles.title}>Vicky Bilbily</div>
          <div className={styles.subtitle}>Multi-disciplinary software developer with strong UX sensibilities.</div>
          <FilterNavigation filter={filter} />
        </div>
        <ProjectCardsContainer filter={filter} />
      </div>
    )
}