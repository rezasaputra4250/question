import React, { useState, useEffect } from 'react';
// Mengimpor data pengalaman (level dan pengalaman) dari file JSON yang ada di folder 'data/experiences.json'.
import experienceData from '../data/experiences.json'; 

// Fungsi untuk menghitung level berdasarkan experience (exp)
const getLevelFromExp = (exp) => {
  // Mengiterasi data experience untuk mencari level yang sesuai berdasarkan exp
  for (let i = 0; i < experienceData.length; i++) {
    // Jika exp lebih kecil dari nilai experience pada indeks saat ini
    if (exp < experienceData[i].experience) {
      // Kembalikan level pada data sebelumnya (jika ada), atau level 1 jika ini adalah exp pertama
      return experienceData[i - 1] ? experienceData[i - 1].level : 1;
    }
  }
  // Jika exp lebih besar dari pengalaman terakhir, maka return level tertinggi yang ada
  return experienceData[experienceData.length - 1].level;
};

const ProfileModal = ({ isProfileModalOpen, playerData, onClose }) => {
  // Jika modal tidak terbuka atau data pemain tidak tersedia, tidak menampilkan apa pun
  if (!isProfileModalOpen || !playerData) return null;

  // Menentukan level pemain berdasarkan total exp yang dimilikinya
  const playerLevel = getLevelFromExp(playerData.exp);

  // Menghitung level untuk setiap skill berdasarkan exp yang dimiliki skill tersebut
  const skillLevels = playerData.skills ? Object.keys(playerData.skills).reduce((acc, skillKey) => {
    // Menggunakan fungsi getLevelFromExp untuk mendapatkan level dari exp skill
    acc[skillKey] = getLevelFromExp(playerData.skills[skillKey].exp);
    return acc;
  }, {}) : {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        
        {/* Menampilkan nama depan dan belakang pemain */}
        <p><strong>First Name:</strong> {playerData.firstName} {playerData.lastName}</p>
        
        {/* Menampilkan jenis kelamin pemain */}
        <p><strong>Gender:</strong> {playerData.gender}</p>
        
        {/* Menghitung dan menampilkan umur berdasarkan data yang ada */}
        <p><strong>Age:</strong> {playerData.age}</p>
        
        {/* Menampilkan MP (Mana Points) pemain */}
        <p><strong>MP:</strong> {playerData.mp}</p>
        
        {/* Menampilkan HP (Health Points) pemain */}
        <p><strong>HP:</strong> {playerData.hp}</p>
        
        {/* Menampilkan level pemain yang dihitung berdasarkan total exp */}
        <p><strong>Level:</strong> {playerLevel}</p>
        
        {/* Menampilkan total exp yang dimiliki pemain */}
        <p><strong>Exp:</strong> {playerData.exp}</p>

        {/* Jika pemain memiliki skill, tampilkan skills dalam bentuk badge */}
        {playerData.skills && Object.keys(playerData.skills).length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Skills:</h3>
            <div className="flex flex-wrap space-x-2 mt-2">
              {/* Mengiterasi setiap skill yang dimiliki pemain */}
              {Object.keys(playerData.skills).map((skillKey) => {
                const skill = playerData.skills[skillKey];
                // Mengambil level skill dari skillLevels (level skill berdasarkan exp yang dimiliki skill)
                const skillLevel = skillLevels[skillKey] || 1;
                return (
                  <span
                    key={skillKey}
                    className="inline-block bg-blue-500 text-white py-1 px-3 rounded-full text-sm"
                  >
                    {/* Menampilkan nama skill dengan levelnya */}
                    {`${skillKey.charAt(0).toUpperCase() + skillKey.slice(1)} (Lvl ${skillLevel})`}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Tombol untuk menutup modal */}
        <button
          onClick={onClose} // Memanggil fungsi onClose untuk menutup modal
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
