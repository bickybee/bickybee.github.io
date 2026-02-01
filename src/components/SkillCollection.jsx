import styles from './tags.module.css'

export function SkillCollection(props) {
  const skills = props.skills.map(skill => (
    skill.subSkills.map(subSkill => (
        <div className={styles.tag + ' ' + styles[skill.type]} key={subSkill}>
            { subSkill }
        </div>
    ))  
  ));

  return (
    <div className={styles.tagContainer}>
      { skills }
    </div>
  );
}