import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { data } from "@remix-run/router";

function ClothesSection({ onCardClick, clothingItems, onAddNewClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button onClick={onAddNewClick} className="clothes-section__button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
