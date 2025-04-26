import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeButton from "../../assets/closeItemModal.png";

function ItemModal({ isOpen, onClose, card, onOpenDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__footer_delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-preview"
        >
          <img src={closeButton} alt="closeButton" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_heading">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                onClick={() => onOpenDelete(card)}
                className={itemDeleteButtonClassName}
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
