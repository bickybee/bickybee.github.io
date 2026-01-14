import { TYPE_CONFIGS } from '../data/constants.js';
import styles from './tags.module.css'

export function TagCollection(props) {
  const tags = props.tags.map(tag => (
    <div className={styles.tag + ' ' + styles[tag] + ' ' + styles[props.size]} key={tag}>
      { TYPE_CONFIGS[tag].text }
    </div>
  ));

  return (
    <div className={styles.tagContainer}>
      { tags }
    </div>
  );
}