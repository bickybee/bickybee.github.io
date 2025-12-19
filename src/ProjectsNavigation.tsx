import { TYPE_CONFIGS } from './data/constants';

export function ProjectsNavigation(props) {
  
  function makeButton(key, config, props) {
    var className = 'button fade-in ' + key;
    console.log(props.filter);
    if (props.filter === key)
    {
      className = className + ' selected';
    }
    else if (props.filter !== "")
    {
      className = className + '  unselected';
    }
    return <button className={className} key={key} id={key}>
      {config.text}
    </button>
  };

const buttons = Object.entries(TYPE_CONFIGS).map(([key, config]) => makeButton(key, config, props));

  return (
    <div className="button-container">
        { buttons }
    </div>
  );
}