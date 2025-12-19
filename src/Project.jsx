import { useEffect, useState, forceUpdate } from 'react';
import { TagCollection } from './TagCollection';

export function Project(props) {
  useEffect(() => {
    fetch(props.contentPath).then(res => res.text()).then( text => {
      //console.log(text);
  });
    //console.log('Project component mounted or updated');
  }, [props]);

  const [filter, setFilter] = useState("");
  if (filter !== props.filter) {
    setFilter(props.filter); // Force re-render to load content whenever filter changes
  }
  
  return (
    <div className = "project-block fade-in">
      <div className = "project-header">
        <div className = "project-img">
          <img src={props.previewImage} alt={props.title} width="100%" />
        </div>
          <h className= "project-title">
            {props.title}
          </h>
           <h className= "project-subtitle">
            {props.subtitle}
          </h>
      </div>

      <div className="project-info">
          {props.tagline}

          <TagCollection tags={props.tags} />
      </div>
    </div>
  );
}