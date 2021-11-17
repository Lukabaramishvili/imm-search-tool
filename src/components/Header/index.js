import React from "react";
import Logo from "../../images/immo-logo.svg";

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-wrapper">
        <a href="/">
          <img className="logo-image" src={Logo} alt="Immo" />
        </a>
      </div>
      <div className="header-text">
        <h1>Property search tool</h1>
      </div>
    </header>
  );
};

export default Header;
