import React from 'react';
import experienceData from '../../data/experiences.json'; // Mengimpor data level dan pengalaman dari file JSON

// Fungsi untuk menghitung level berdasarkan pengalaman (exp)
// Fungsi ini akan mencari level pemain berdasarkan nilai exp yang diberikan
const getLevelFromExp = (exp) => {
  // Mengiterasi data experience untuk mencari level yang sesuai berdasarkan exp
  for (let i = 0; i < experienceData.length; i++) {
    if (exp < experienceData[i].experience) {
      return experienceData[i - 1] ? experienceData[i - 1].level : 1;
    }
  }
  // Jika exp lebih besar atau sama dengan pengalaman terakhir, maka return level tertinggi yang ada
  return experienceData[experienceData.length - 1].level;
};

const LevelSection = ({ level, exp }) => {
  // Mendapatkan level berdasarkan exp pemain menggunakan fungsi getLevelFromExp
  const playerLevel = getLevelFromExp(exp);

  // Menentukan data pengalaman untuk level saat ini
  const currentLevelData = experienceData.find((data) => data.level === playerLevel);
  const nextLevelData = experienceData.find((data) => data.level === playerLevel + 1);

  // Jika level pemain saat ini adalah level terakhir (tidak ada level berikutnya),
  // maka batas atas akan menggunakan exp level terakhir
  const minExpForLevel = currentLevelData ? currentLevelData.experience : 0;
  const maxExpForNextLevel = nextLevelData ? nextLevelData.experience : currentLevelData.experience;

  // Menghitung persentase progress bar berdasarkan pengalaman pemain
  // Kita harus pastikan tidak melampaui nilai maksimal exp level terakhir
  const progressBarWidth = nextLevelData
    ? ((exp - minExpForLevel) / (maxExpForNextLevel - minExpForLevel)) * 100
    : 100; // Jika level terakhir, progress bar 100%

  return (
    <div className="mt-4 text-center">
      {/* Menampilkan level pemain berdasarkan hasil dari fungsi getLevelFromExp */}
      <h2 className="text-xl font-semibold">Level Pemain: {playerLevel}</h2>
      {/* Menampilkan pengalaman (exp) pemain saat ini */}
      <h3 className="text-lg">Exp Pemain: {exp} / {experienceData[experienceData.length - 1].experience}</h3> {/* Menampilkan total max exp */}

      {/* Progress Bar untuk Level Pemain */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          {/* Bar progress yang menunjukkan persentase pengalaman yang sudah dicapai */}
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              // Menghitung lebar progress bar berdasarkan persentase exp pemain
              width: `${progressBarWidth}%`, // Menggunakan persentase yang telah dihitung sebelumnya
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LevelSection;
