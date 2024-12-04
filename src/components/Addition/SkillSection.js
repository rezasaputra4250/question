import React from 'react';
import experienceData from '../../data/experiences.json'; // Mengimpor data pengalaman dari file JSON

const SkillSection = ({ skillData }) => {
  // Mendapatkan batas maksimum pengalaman berdasarkan data experience
  const maxExp = experienceData[experienceData.length - 1].experience;

  return (
    <div className="mt-4 text-center">
      {/* Menampilkan nama skill */}
      <h2 className="text-xl font-semibold">Skill Penjumlahan</h2>
      
      {/* Menampilkan level skill */}
      <h3 className="text-lg">Level: {skillData.level}</h3>
      
      {/* Menampilkan jumlah pengalaman skill */}
      <p className="text-lg">Exp: {skillData.exp}</p>

      {/* Progress Bar untuk Skill Penjumlahan */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          {/* Progress bar menunjukkan persentase pengalaman skill */}
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{
              // Menghitung lebar progress bar berdasarkan persentase exp skill pemain
              // Menggunakan maxExp dari experienceData untuk menentukan pengalaman maksimal
              width: `${(skillData.exp / maxExp) * 100}%`, // Progress hingga max exp yang ada di experienceData
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
