import React from 'react';

const LoginModal = ({
  isModalOpen,
  onClose,
  firstName,
  lastName,
  gender,
  birthDate,
  onSubmit,
  onChangeFirstName,
  onChangeLastName,
  onChangeGender,
  onChangeBirthDate,
  isEditProfile,  // Menerima properti isEditProfile
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditProfile ? 'Edit Profile' : 'Login Form'}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-400"
          >
            Tutup
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-4 flex space-x-4">
            {/* Nama Depan */}
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-gray-700">Nama Depan</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => onChangeFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                placeholder="Masukkan nama depan"
              />
            </div>

            {/* Nama Belakang */}
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-gray-700">Nama Belakang</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => onChangeLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                placeholder="Masukkan nama belakang"
              />
            </div>
          </div>

          {/* Gender (Select Dropdown) */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => onChangeGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Pilih Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Tanggal Lahir */}
          <div className="mb-4">
            <label htmlFor="birthDate" className="block text-gray-700">Tanggal Lahir</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => onChangeBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400"
          >
            {isEditProfile ? 'Update Profile' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
