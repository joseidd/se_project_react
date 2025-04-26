import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import Avatar from "../../assets/avatar-wtwr.png";

function SideBar({ handleProfileEditClick, onLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const avatar = currentUser?.avatar;
  const name = currentUser?.name;

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleProfileEditClick}
          className="sidebar__change-profile-button"
        >
          Change profile data
        </button>
        <button className="sidebar__singout-button" onClick={onLogOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
