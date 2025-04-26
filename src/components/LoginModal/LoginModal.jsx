import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  closeActiveModal,
  onLogin,
  isLoginOpen,
  handleRegisterClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (isLoginOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isLoginOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Log in"
      isOpen={isLoginOpen}
      onClose={closeActiveModal}
      onSubmit={handleLogin}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          id="login__email"
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
          id="login__password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="modal__submit-buttons">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-alt"
          onClick={handleRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
