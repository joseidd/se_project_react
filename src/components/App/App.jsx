import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ProtectedRoute from "../ProtectedRoute";
import { getToken, removeToken, setToken } from "../../utils/token";
import { getItems, addItem, deleteCard, editProfile } from "../../utils/api";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    getUserInfo();
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
    setCurrentUser(currentUser);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
  //   addItem({ name, imageUrl, weather })
  //     .then((values) => {
  //       setClothingItems([values, ...clothingItems]);
  //       closeActiveModal();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleOpenDelete = (card) => {
    setActiveModal("delete-item");
    // setSelectedCard(card);
    // const token = getToken();
    // deleteCard(selectedCard._id, token)
    //   .then((data) => {
    //     setClothingItems(
    //       clothingItems.filter((item) => item._id !== selectedCard._id)
    //     );
    //     setSelectedCard({});
    //     closeActiveModal();
    //   })
    //   .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  function getUserInfo() {
    const token = getToken();
    auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleCardLike = (id, isLiked) => {
    const token = getToken();
    console.log("user token:", token);
    console.log("card id:", id);
    console.log("isLiked:", isLiked);

    !isLiked
      ? api

          .likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
            console.log("Updated (liked) card from API:", updatedCard.data);
          })
          .catch((err) => console.log(err))
      : api

          .unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            console.log("Updated (unliked) card from API:", updatedCard.data);
          })
          .catch(console.error);
  };

  const onAddItem = (values) => {
    const { name, imageUrl, weather } = values;
    const token = getToken();
    api
      .addItem(name, imageUrl, weather, token)
      .then((res) => {
        setClothingItems((prevItems) => [res.data, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const onDeleteItem = (_id) => {
    const token = getToken();
    api
      .deleteCard(_id, token)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== _id);
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const onRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        onLogin({ email, password });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const onLogin = ({ email, password }) => {
    if (!email || !password) return;
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);
          getUserInfo();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const onEditProfile = ({ name, avatar }) => {
    const token = getToken();
    editProfile(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        }));
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error editing profile:", error);
      });
  };

  function handleLogOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  const isAddGarmentOpen = activeModal === "add-garment";
  const isItemModalOpen = activeModal === "preview";
  const isRegisterOpen = activeModal === "register";
  const isLoginOpen = activeModal === "login";
  const isEditProfileOpen = activeModal === "edit-profile";
  const isDeleteItemOpen = activeModal === "delete-item";

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                      onLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={isAddGarmentOpen}
            onAddItem={onAddItem}
            onClose={closeActiveModal}
          />
          <ItemModal
            isOpen={isItemModalOpen}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
          />
          <RegisterModal
            isRegisterOpen={isRegisterOpen}
            onRegistration={onRegistration}
            closeActiveModal={closeActiveModal}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isLoginOpen={isLoginOpen}
            onLogin={onLogin}
            closeActiveModal={closeActiveModal}
            handleRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            isEditProfileOpen={isEditProfileOpen}
            onEditProfile={onEditProfile}
            closeActiveModal={closeActiveModal}
          />
          <DeleteItemModal
            card={selectedCard}
            isOpen={isDeleteItemOpen}
            onDeleteItem={onDeleteItem}
            closeActiveModal={closeActiveModal}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
