import { TYPE_CONFIGS } from '../../data/constants.ts';
import type { ProjectSkill } from '../../data/data.types.ts';
import styles from './skillCard.module.css'

interface SkillCardProps {
  skill: ProjectSkill
}

export function SkillCard(props: SkillCardProps) {
  const skillData = props.skill;
  const skillFormatting = TYPE_CONFIGS[skillData.type];
  console.log(skillFormatting);
  let key = 0
  const subSkillList = skillData.subSkills.map(subSkill => (
    <li key={key++}>
      {subSkill}
    </li>
  ));

  return (
    <div className={styles.card} style={{ backgroundColor: skillFormatting.color }}>
      <div className={styles.title}>
        {skillFormatting.text}
      </div>
      <div className={styles.content}>
        <ul>
          {subSkillList}
        </ul>
      </div>
    </div>
  );
}