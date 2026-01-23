import { TYPE_CONFIGS } from '../data/constants.js';
import styles from './skillCard.module.css'

export function SkillCard(props) {
  const skillData = props.skill;
  const skillFormatting = TYPE_CONFIGS[skillData.type];
  console.log(skillFormatting);
  let key = 0
  const subSkillList = skillData.subSkills.map(subSkill => (
    <li key={key++}>
      { subSkill }
    </li>
  ));

  return (
    <div className={styles.card} style={{ backgroundColor: skillFormatting.color }}>
      <div className={styles.title}>
        { skillFormatting.text }
      </div>
      <div className={styles.content}>
        <ul>
          { subSkillList }
        </ul>
      </div>
    </div>
  );
}