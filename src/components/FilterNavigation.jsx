import { TYPE_CONFIGS } from '../data/constants';
import styles from './filters.module.css'

export function FilterNavigation(props) {
  
  function makeButton(key, config, props) {
    var className = 'button fade-in ' + styles[key];
    if (props.filter === key)
    {
      className = className + ' ' + styles.selected;
    }
    else if (props.filter !== "")
    {
      className = className + ' ' + styles.unselected;
    }
    return <button className={className} key={key} id={key}>
      {config.text}
    </button>
  };

const buttons = Object.entries(TYPE_CONFIGS).map(([key, config]) => makeButton(key, config, props));

  return (
    <div className={styles.buttonContainer}>
        { buttons }
    </div>
  );
}