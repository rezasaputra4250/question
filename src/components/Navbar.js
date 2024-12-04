import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPuzzlePiece } from 'react-icons/fa'; // Menggunakan ikon user dan puzzle (quiz)
import { Link } from 'react-router-dom'; // Menggunakan Link untuk navigasi

const Navbar = ({ playerData, onLoginClick, onEditProfileClick, onViewProfileClick, onDeleteAccount, quizLinks }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown user
  const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false); // State untuk dropdown quiz
  const dropdownRef = useRef(null); // Referensi untuk dropdown user
  const quizDropdownRef = useRef(null); // Referensi untuk dropdown quiz

  // Menutup dropdown jika pengguna mengklik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
        (quizDropdownRef.current && !quizDropdownRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
        setIsQuizDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown user saat tombol diklik
  };

  const toggleQuizDropdown = () => {
    setIsQuizDropdownOpen((prev) => !prev); // Toggle dropdown quiz saat tombol diklik
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Judul aplikasi */}
        <h1 className="text-white text-xl font-bold">Login App</h1>

        <div className="flex items-center space-x-6">
          {/* Dropdown Quiz */}
          <div className="relative">
            <button 
              className="text-white rounded-md flex items-center" 
              onClick={toggleQuizDropdown}
            >
              {/* Ikon untuk quiz */}
              <FaPuzzlePiece className="text-2xl" />
            </button>

            {/* Dropdown Menu untuk quiz */}
            {isQuizDropdownOpen && (
              <div 
                ref={quizDropdownRef} 
                className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50"
              >
                {/* Link ke halaman Penjumlahan */}
                <Link
                  to="/penjumlahan"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Penjumlahan
                </Link>
                
                {/* Link ke halaman Pengurangan */}
                <Link
                  to="/pengurangan"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pengurangan
                </Link>
                
                {/* Link ke halaman Perkalian */}
                <Link
                  to="/perkalian"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Perkalian
                </Link>
                
                {/* Link ke halaman Pembagian */}
                <Link
                  to="/pembagian"
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pembagian
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown User */}
          {playerData ? (
            <div className="relative">
              {/* Tombol untuk mengklik dan menampilkan dropdown user */}
              <button 
                className="text-white rounded-md flex items-center" 
                onClick={toggleDropdown}
              >
                {/* Ikon untuk user */}
                <FaUser className="text-2xl" />
              </button>

              {/* Dropdown Menu untuk User */}
              {isDropdownOpen && (
                <div 
                  ref={dropdownRef} 
                  className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50"
                >
                  <button
                    onClick={onViewProfileClick}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={onEditProfileClick}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={onDeleteAccount}
                    className="block w-full px-4 py-2 text-red-500 hover:bg-red-100"
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Jika tidak ada playerData, tampilkan tombol login
            <button 
              onClick={onLoginClick} 
              className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-400"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
