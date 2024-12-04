import React, { useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';

const Navbar = ({ playerData, onLoginClick, onEditProfileClick, onViewProfileClick, onDeleteAccount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol dropdown
  const dropdownRef = useRef(null); // Referensi untuk dropdown

  // Menutup dropdown jika pengguna mengklik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Login App</h1>

        {playerData ? (
          <div className="relative">
            <button 
              className="text-white rounded-md flex items-center" 
              onClick={toggleDropdown}
            >
              <FaUser className="text-2xl" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                ref={dropdownRef} 
                className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48"
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
          <button
            onClick={onLoginClick}
            className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-400"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
