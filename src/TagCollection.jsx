import { TYPE_CONFIGS } from './data/constants.js';

export function TagCollection(props) {
  const tags = props.tags.map(tag => (
    <div className={'tag ' + tag} key={tag}>
      { TYPE_CONFIGS[tag].text }
    </div>
  ));

  return (
    <div className="tag-collection">
      { tags }
    </div>
  );
}