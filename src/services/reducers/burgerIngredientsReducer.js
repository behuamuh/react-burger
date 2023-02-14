import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR } from '../actions/burgerIngredientsAction';

    const ingredientsInitialState = {
        burgerIngredientsList: [],
        burgerIngredientsListRequest: false,
        burgerIngredientsListError: false,
        burgerIngredientsListErrorText: undefined,
    };

    export default function burgerIngredientsReducer( state = ingredientsInitialState, action) {
        switch (action.type) {
            case GET_INGREDIENTS_REQUEST:
                return { ...state, burgerIngredientsListRequest: true};
            case GET_INGREDIENTS_SUCCESS:
                return {
                    ...state,
                    burgerIngredientsList: action.payload,
                    burgerIngredientsListRequest: false,
                    burgerIngredientsListError: false,
                };
             case GET_INGREDIENTS_ERROR:
               return {
                burgerIngredientsList: false,
                burgerIngredientsListError: true,
                burgerIngredientsListErrorText: action.errorText,
               };
            default:
                return state;        
        }
    }