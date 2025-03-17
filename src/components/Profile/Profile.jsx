import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar.jsx/SideBar";
import "./Profile.css";

function Profile({ onCardClick, clothingItems, onAddNewClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddNewClick={onAddNewClick}
        />
      </section>
    </div>
  );
}

export default Profile;
