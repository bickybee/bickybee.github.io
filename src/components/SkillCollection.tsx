import type { ProjectSkill } from '../data/data.types';
import styles from './skills.module.css'

interface SkillCollectionProps {
  skills: ProjectSkill[]
}

export function SkillCollection(props: SkillCollectionProps) {
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