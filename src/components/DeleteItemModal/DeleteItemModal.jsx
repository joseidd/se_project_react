import "./DeleteItemModal.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const DeleteItemModal = ({ card, isOpen, closeActiveModal, onDeleteItem }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const itemConfirmDeleteClassname = `modal__button modal__button_confirm ${
    isOwn ? "" : "modal__button_hidden"
  }`;

  const handleDeleteItem = () => {
    onDeleteItem(card._id);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <h2 className="modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__title">This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            onClick={handleDeleteItem}
            className={itemConfirmDeleteClassname}
          >
            Yes, delete item
          </button>
          <button
            onClick={closeActiveModal}
            className="modal__button modal__button_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
