import React from 'react';

const SoalPenjumlahan = ({ num1, num2, userAnswer, setUserAnswer, handleSubmit, handleKeyDown }) => (
  <div className="mb-4">
    <p className="text-center text-xl font-bold">{num1} + {num2} = ?</p>
    <div className="mb-4">
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Masukkan jawaban"
        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
        onKeyDown={handleKeyDown}
      />
    </div>
    <button
      onClick={handleSubmit}
      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Submit
    </button>
  </div>
);

export default SoalPenjumlahan;
