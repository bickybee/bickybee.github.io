import styles from './skills.module.css'

export function SkillCollection(props) {
  const skills = props.skills.map(skill => (
    skill.subSkills.map(subSkill => (
        <div className={styles.skill + ' ' + styles[skill.type]} key={subSkill}>
            { subSkill }
        </div>
    ))  
  ));

  return (
    <div className={styles.skillContainer}>
      { skills }
    </div>
  );
}