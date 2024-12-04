import React, { useEffect, useState } from 'react';
import experienceData from '../../data/experiences.json'; // Mengimpor data pengalaman dari file JSON

const getLevelFromExp = (exp) => {
  for (let i = 0; i < experienceData.length; i++) {
    if (exp < experienceData[i].experience) {
      return experienceData[i - 1] ? experienceData[i - 1].level : 1;
    }
  }
  return experienceData[experienceData.length - 1].level;  // Jika exp lebih tinggi dari level terakhir
};

const SkillSection = ({ skillData }) => {
  const [level, setLevel] = useState(getLevelFromExp(skillData.exp));

  useEffect(() => {
    // Menghitung level skill berdasarkan pengalaman
    const newLevel = getLevelFromExp(skillData.exp);
    setLevel(newLevel);
    
    // Menampilkan level dan exp skill di console
    console.log(`Skill Level: ${newLevel}, Exp: ${skillData.exp}`);
  }, [skillData.exp]); // Melacak perubahan exp skill

  return null;
};

export default SkillSection;
