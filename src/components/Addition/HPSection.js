import React, { useEffect } from 'react';

const HPSection = ({ hp }) => {
  useEffect(() => {
    // Menampilkan HP di console setiap kali HP berubah
    console.log(`HP Pemain: ${hp}`);
  }, [hp]); // Menampilkan saat HP berubah

  return null;
};

export default HPSection;
