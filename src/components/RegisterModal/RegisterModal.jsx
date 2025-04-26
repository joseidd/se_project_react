import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeActiveModal,
  onRegistration,
  isRegisterOpen,
  handleLoginClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    onRegistration({ email, password, name, avatar });
  };

  useEffect(() => {
    if (isRegisterOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isRegisterOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      isOpen={isRegisterOpen}
      onClose={closeActiveModal}
      onSubmit={handleRegistration}
      handleLoginClick={handleLoginClick}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          id="register__email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          id="register__password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          id="register__name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar{" "}
        <input
          type="url"
          id="register__avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <div className="modal__submit-buttons">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-alt"
          onClick={handleLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
