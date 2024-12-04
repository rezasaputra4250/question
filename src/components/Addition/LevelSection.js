import { useEffect } from 'react';
import experienceData from '../../data/experiences.json'; // Mengimpor data pengalaman dari file JSON

const getLevelFromExp = (exp) => {
  for (let i = 0; i < experienceData.length; i++) {
    if (exp < experienceData[i].experience) {
      return experienceData[i - 1] ? experienceData[i - 1].level : 1;
    }
  }
  // Jika exp lebih tinggi dari level terakhir
  return experienceData[experienceData.length - 1].level;
};

const LevelSection = ({ exp }) => {
  useEffect(() => {
    // Menghitung level baru berdasarkan pengalaman yang terbaru
    const newLevel = getLevelFromExp(exp);
    console.log(`Pemain Level: ${newLevel}, Pengalaman: ${exp}`);
  }, [exp]); // Melacak perubahan exp dan menghitung level berdasarkan exp

  return null; // Tidak ada tampilan yang di-render
};

export default LevelSection;
