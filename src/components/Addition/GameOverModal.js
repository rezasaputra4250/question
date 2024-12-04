import React from 'react';

const GameOverModal = ({ showGameOverModal, handleClose, handleRestart }) => {
  return (
    // Modal hanya akan muncul jika showGameOverModal bernilai true
    showGameOverModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Judul modal */}
          <h2 className="text-xl font-semibold text-center mb-4">Game Over!</h2>

          {/* Pesan untuk player */}
          <p className="text-center mb-4">Apakah Anda ingin melanjutkan atau keluar?</p>

          {/* Tombol Lanjutkan dan Keluar */}
          <div className="flex justify-around">
            {/* Tombol Lanjutkan yang memanggil handleRestart */}
            <button
              onClick={handleRestart}  // Pastikan handleRestart diteruskan dengan benar
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Lanjutkan
            </button>


            {/* Tombol Keluar yang memanggil handleClose */}
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GameOverModal;
