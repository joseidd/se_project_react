import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/logo-wtwr.svg";
import Avatar from "../../assets/avatar-wtwr.png";
import ToggleSwitch from "../ToogleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const name = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || null;

  const userInitial = name ? name.charAt(0).toUpperCase() : "?";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" alt="WTWR" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{name}</p>
            </div>
          </Link>
          {avatar ? (
            <img src={Avatar} alt="User Avatar" className="header__avatar" />
          ) : (
            <div className="header__avatar-placeholder">{userInitial}</div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterClick}
            className="header__register-button"
          >
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__signin-button">
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
