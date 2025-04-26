import React, { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeActiveModal,
  onEditProfile,
  isEditProfileOpen,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name);
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  useEffect(() => {
    if (isEditProfileOpen) {
      setName(currentUser?.name);
      setAvatar(currentUser?.avatar);
    }
  }, [isEditProfileOpen, currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit profile"
      isOpen={isEditProfileOpen}
      onClose={closeActiveModal}
      onSubmit={handleEditProfile}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          id="edit__name"
          className="modal__input"
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          id="edit__avatar"
          className="modal__input"
          value={avatar}
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
