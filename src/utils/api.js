import {
  INGREDIENTS_URL,
  ORDER_URL,
  REGISTER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  TOKEN_URL,
  CHECK_ACCESS_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from "../utils/variables";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getIngredients = async () => {
  return fetch(`${INGREDIENTS_URL}`).then(checkResponse);
};

/*const apiOrder = async (arrayId) => { //переписать с учетом токена
    return fetch(`${ORDER_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ingredients': arrayId,
        }),
    }).then(checkResponse);
}*/

const apiOrder = async (arrayId, accessToken) => {
  return fetch(ORDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ingredients: arrayId,
    }),
  }).then(checkResponse);
};

const registerUserRequest = async (userDate) => {
  return fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const loginUserRequest = async (userDate) => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const logoutUserRequest = async (refreshToken) => {
  return fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};

const checkUserAccessRequest = async (accessToken) => {
  return fetch(CHECK_ACCESS_URL, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponse);
};



const refreshTokenRequest = async (refreshToken) => {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};

const forgotPasswordRequest = async (email) => {
  return fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then(checkResponse);
};

const resetPasswordRequest = async (userDate) => {
  return fetch(RESET_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const changeUserDataRequest = async (userDate, accessToken) => {
  return fetch(CHECK_ACCESS_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

export {
  apiOrder,
  getIngredients,
  registerUserRequest,
  loginUserRequest,
  logoutUserRequest,
  checkUserAccessRequest,
  refreshTokenRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  changeUserDataRequest,
};
