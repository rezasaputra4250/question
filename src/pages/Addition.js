import React, { useState, useEffect } from 'react';
import SoalPenjumlahan from '../components/Addition/SoalPenjumlahan';
import Timer from '../components/Addition/Timer';
import SkillSection from '../components/Addition/SkillSection';
import LevelSection from '../components/Addition/LevelSection';
import HPSection from '../components/Addition/HPSection';
import { SkillModal, LevelUpModal } from '../components/Addition/Modals';
import GameOverModal from '../components/Addition/GameOverModal';  // Import GameOverModal
import experienceData from '../data/experiences.json';  // Pastikan data experience sudah ada di sini

// Fungsi untuk menghitung level berdasarkan pengalaman (exp)
const getLevelFromExp = (exp) => {
  for (let i = 0; i < experienceData.length; i++) {
    if (exp < experienceData[i].experience) {
      return experienceData[i - 1] ? experienceData[i - 1].level : 1;
    }
  }
  return experienceData[experienceData.length - 1].level;
};

const Addition = ({ playerData, setPlayerData }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [skillMessage, setSkillMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false); // State untuk modal Game Over

  useEffect(() => {
    generateRandomProblem();
  }, [playerData.level]);
  
  const generateRandomProblem = () => {
    // Ambil level berdasarkan pengalaman dari playerData
    const level = getLevelFromExp(playerData.exp);
  
    // Tentukan jumlah angka yang digunakan berdasarkan level
    const numDigits = level; // Misalnya, level 1 -> 1 digit, level 2 -> 2 digit, dst.
  
    // Menghasilkan soal dengan jumlah angka sesuai level
    const num1 = Math.floor(Math.random() * Math.pow(10, numDigits));
    const num2 = Math.floor(Math.random() * Math.pow(10, numDigits));
  
    // Update state dengan soal baru
    setNum1(num1);
    setNum2(num2);
  
    // Reset timer dan mulai timer
    setTimer(60);
    startTimer();
  };
  

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    setTimerInterval(interval);
  };
  const handleTimeUp = () => {
    if (playerData.hp > 0) {
      const updatedData = { ...playerData };
      updatedData.hp -= 1;  // Hanya mengurangi HP saat waktu habis
      setPlayerData(updatedData);
      localStorage.setItem('player', JSON.stringify(updatedData));
    } else {
      setShowGameOverModal(true);  // Tampilkan modal Game Over jika HP habis
    }
  
    setUserAnswer('');
    generateRandomProblem();
  };
  
  const handleSubmit = () => {
    const correctAnswer = num1 + num2;
    if (Number(userAnswer) === correctAnswer) {
      const prevLevel = playerData.level;
      const prevSkillLevel = playerData.skills?.penjumlahan?.level || 0;
  
      let newExp = playerData.exp + 10;
      let newLevel = getLevelFromExp(newExp);  // Level dihitung berdasarkan exp
  
      let newSkillExp = (playerData.skills?.penjumlahan?.exp || 0) + 10;
      let newSkillLevel = Math.floor(newSkillExp / 100) + 1;
  
      const updatedSkills = { ...playerData.skills };
      if (!updatedSkills.penjumlahan) {
        updatedSkills.penjumlahan = {
          exp: newSkillExp,
          level: newSkillLevel
        };
        setSkillMessage('Skill Penjumlahan berhasil ditambahkan!');
        setShowSkillModal(true);
      } else {
        updatedSkills.penjumlahan.exp = newSkillExp;
        updatedSkills.penjumlahan.level = newSkillLevel;
      }
  
      const updatedData = {
        ...playerData,
        exp: newExp,
        level: newLevel,
        skills: updatedSkills,
      };
  
      setPlayerData(updatedData);
      localStorage.setItem('player', JSON.stringify(updatedData));
  
      if (newLevel > prevLevel) {
        setLevelUpMessage(`Selamat! Anda naik ke level ${newLevel}.`);
        setShowLevelUpModal(true);
      } else {
        setLevelUpMessage('');
      }
  
      setTimeout(() => setSkillMessage(''), 3000);
    } else {
      const updatedData = { ...playerData };
      if (updatedData.hp > 0) {
        updatedData.hp -= 1;
        setPlayerData(updatedData);
        localStorage.setItem('player', JSON.stringify(updatedData));
      } else {
        setShowGameOverModal(true);  // Game Over jika HP habis
      }
    }
  
    setUserAnswer('');
    generateRandomProblem();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
const handleRestart = () => {
  const updatedData = { ...playerData };

  // Set HP kembali ke 3 dan kurangi EXP
  updatedData.hp = 3;
  updatedData.exp = Math.max(0, updatedData.exp - 100);  // Mengurangi 100 exp, pastikan exp tidak negatif
  
  setPlayerData(updatedData);
  localStorage.setItem('player', JSON.stringify(updatedData));

  setShowGameOverModal(false);
  generateRandomProblem();
};


  const handleClose = () => {
    alert('Terima kasih sudah bermain!');  // Keluar dari game
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Ujian Penjumlahan</h1>

        <SoalPenjumlahan
          num1={num1}
          num2={num2}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />
        <Timer timer={timer} />
        <SkillSection skillData={playerData.skills?.penjumlahan || { level: 0, exp: 0 }} />
        <LevelSection level={playerData.level} exp={playerData.exp} />
        <HPSection hp={playerData.hp} />
      </div>

      <SkillModal showSkillModal={showSkillModal} closeSkillModal={() => setShowSkillModal(false)} />
      <LevelUpModal showLevelUpModal={showLevelUpModal} levelUpMessage={levelUpMessage} closeLevelUpModal={() => setShowLevelUpModal(false)} />
      
      <GameOverModal 
        showGameOverModal={showGameOverModal} 
        handleClose={handleClose} 
        handleRestart={handleRestart} 
      />
    </div>
  );
};

export default Addition;
