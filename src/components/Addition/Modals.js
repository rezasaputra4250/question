import React from 'react';

const SkillModal = ({ showSkillModal, closeSkillModal }) => (
  showSkillModal && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold">Skill Penjumlahan Ditambahkan!</h2>
        <p className="mt-2">Skill Penjumlahan berhasil ditambahkan ke karakter Anda. Mulai tingkatkan skill Anda!</p>
        <button
          onClick={closeSkillModal}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Tutup
        </button>
      </div>
    </div>
  )
);

const LevelUpModal = ({ showLevelUpModal, levelUpMessage, closeLevelUpModal }) => (
  showLevelUpModal && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold">Level Up!</h2>
        <p className="mt-2">{levelUpMessage}</p>
        <button
          onClick={closeLevelUpModal}
          className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Tutup
        </button>
      </div>
    </div>
  )
);

export { SkillModal, LevelUpModal };
