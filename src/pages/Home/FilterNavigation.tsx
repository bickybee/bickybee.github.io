import { TYPE_CONFIGS } from '../../data/constants';
import type { TypeConfig } from '../../data/data.types';
import styles from './filters.module.css'

export function FilterNavigation({ filter }: { filter: string }) {

  function makeButton(key: string, config: TypeConfig, filter: string) {
    var className = 'button fade-in ' + styles[key];
    if (filter === key) {
      className = className + ' ' + styles.selected;
    }
    else if (filter !== "") {
      className = className + ' ' + styles.unselected;
    }
    return <button className={className} key={key} id={key}>
      {config.text}
    </button>
  };

  const buttons = Object.entries(TYPE_CONFIGS).map(([key, config]) => makeButton(key, config, filter));

  return (
    <div className={styles.buttonContainer}>
      {buttons}
    </div>
  );
}