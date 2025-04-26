import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("Current User:", currentUser);
  console.log("Current User _id:", currentUser?._id);
  console.log("Clothing Items:", clothingItems);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  console.log("user items", userItems);

  console.log("Current User:", currentUser);
  console.log("Clothing Items:", clothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="clothes-section__empty">No items added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;