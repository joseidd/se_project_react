import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const isOwn = item.owner === currentUser?._id;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  if (!item._id) {
    console.error("Error: item._id is undefined in handleLike");
    return;
  }

  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <div className="card__info_container">
        <h2 className="card__name">{item.name}</h2>
        <button
          onClick={handleLike}
          className={itemLikeButtonClassName}
          type="button"
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
