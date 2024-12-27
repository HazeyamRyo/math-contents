import React from 'react';
import './Logo.css';
import logoImage from '../../../public/logo.webp'; // ロゴ画像のパスを指定

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logo-image" />
    </div>
  );
};

export { Logo } ;