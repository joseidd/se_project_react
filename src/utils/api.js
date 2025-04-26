const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr01.jumpingcrab.com"
    : "http://localhost:3001";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkRes);
}

function addItem(name, imageUrl, weather, token) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
}

function deleteCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function likeItem(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function unlikeItem(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function editProfile(name, avatar, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  }).then(checkRes);
}

export {
  checkRes,
  getItems,
  addItem,
  likeItem,
  unlikeItem,
  editProfile,
  deleteCard,
};
