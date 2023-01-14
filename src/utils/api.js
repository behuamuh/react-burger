const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';


const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};


export default function getIngredients() {
    return fetch(`${BASE_URL}`).then(checkResponse);
}