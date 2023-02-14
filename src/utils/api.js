const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';


const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};


 const getIngredients = async () => {
    return fetch(`${BASE_URL}`).then(checkResponse);
}



 const apiOrder = async (arrayId) => {
    return fetch(`${ORDER_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ingredients': arrayId,
        }),
    }).then(checkResponse);
}

export { apiOrder, getIngredients };
