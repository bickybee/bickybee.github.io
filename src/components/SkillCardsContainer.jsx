import { SkillCard } from './components.js';
import styles from './skillCardsContainer.module.css'

export function SkillCardsContainer(props) {
    console.log(props.skills);
  const allSkills = props.skills.map(skill =>
    <SkillCard skill={skill} key={skill.type} />
  );

  return (
    <>
        <div className={styles.skillsContainer + ' fade-in'}>
            { allSkills }
        </div>
    </>
  );
}