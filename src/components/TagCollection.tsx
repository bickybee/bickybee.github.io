import { TYPE_CONFIGS } from '../data/constants';
import styles from './tags.module.css'

interface TagCollectionProps {
  tags: string[]
}

export function TagCollection(props: TagCollectionProps) {
  const tags = props.tags.map(tag => (
    <div className={styles.tag + ' ' + styles[tag]} key={tag}>
      { TYPE_CONFIGS[tag].text }
    </div>
  ));

  return (
    <div className={styles.tagContainer}>
      { tags }
    </div>
  );
}