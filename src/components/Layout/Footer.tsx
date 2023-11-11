import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-col items-center">
        © Age of Fallen Empires {currentYear > 2021 ? `2021-${currentYear}` : '2021'}
      </div>
    </footer>
  );
};

export default Footer;
