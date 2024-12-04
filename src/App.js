import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import ProfileModal from './components/ProfileModal';
import Addition from './pages/Addition';
import Subtraction from './pages/Subtraction';
import Multiplication from './pages/Multiplication';
import Division from './pages/Division';
import './index.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const savedPlayerData = localStorage.getItem('player');
    if (savedPlayerData) {
      const parsedPlayerData = JSON.parse(savedPlayerData);
      setPlayerData(parsedPlayerData);
    }
  }, []);

  const handleLoginClick = () => {
    setFirstName('');
    setLastName('');
    setGender('');
    setBirthDate('');
    setIsEditProfile(false); // Set to login mode
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const player = {
      firstName,
      lastName,
      gender,
      birthDate,
      hp: 10,  // Set default HP value
      mp: 100, // Set default MP value
      exp: 0,  // Set default Exp
    };

    localStorage.setItem('player', JSON.stringify(player));
    setPlayerData(player);
    setIsModalOpen(false);
    alert('Data player telah disimpan!');
    setFirstName('');
    setLastName('');
    setGender('');
    setBirthDate('');
  };

  const handleEditProfileClick = () => {
    if (playerData) {
      setFirstName(playerData.firstName);
      setLastName(playerData.lastName);
      setGender(playerData.gender);
      setBirthDate(playerData.birthDate);
      setIsEditProfile(true); // Set to edit profile mode
      setIsModalOpen(true);
    }
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('player');
    setPlayerData(null);
    alert('Akun telah dihapus!');
  };

  const handleViewProfileClick = () => setIsProfileModalOpen(true);
  const handleCloseProfileModal = () => setIsProfileModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Navbar
          playerData={playerData}
          onLoginClick={handleLoginClick}
          onEditProfileClick={handleEditProfileClick}
          onViewProfileClick={handleViewProfileClick}
          onDeleteAccount={handleDeleteAccount}
        />

        <LoginModal
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
          firstName={firstName}
          lastName={lastName}
          gender={gender}
          birthDate={birthDate}
          onSubmit={handleSubmit}
          onChangeFirstName={setFirstName}
          onChangeLastName={setLastName}
          onChangeGender={setGender}
          onChangeBirthDate={setBirthDate}
          isEditProfile={isEditProfile}  // Pass the edit profile state
        />

        <ProfileModal
          isProfileModalOpen={isProfileModalOpen}
          playerData={playerData}
          onClose={handleCloseProfileModal}
        />

        {/* Routes untuk halaman-halaman matematika */}
        <Routes>
          <Route path="/penjumlahan" element={playerData && <Addition playerData={playerData} setPlayerData={setPlayerData} />} />
          <Route path="/pengurangan" element={playerData && <Subtraction playerData={playerData} setPlayerData={setPlayerData} />} />
          <Route path="/perkalian" element={playerData && <Multiplication playerData={playerData} setPlayerData={setPlayerData} />} />
          <Route path="/pembagian" element={playerData && <Division playerData={playerData} setPlayerData={setPlayerData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
