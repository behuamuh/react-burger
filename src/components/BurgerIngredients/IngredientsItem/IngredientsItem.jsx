import styleIngredients from './IngredientsItem.module.css';
import React, { useMemo} from 'react';
import itemPropTypes from '../../../utils/prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../../services/actions/currentIngredientAction';
import { useDrag } from 'react-dnd';




function IngredientsItem({ ingredient }) { 
    /*const [modal, setModal] = React.useState(false);

    const toggleModal = useCallback((e) => {
        e.stopPropagation();
        setModal((prevModal) => !prevModal);
    },[])
    
    function toggleModal(e) {
        e.stopPropagation();
        setModal((prevModal) => !prevModal);
    }
      return (
        <li className={`${styleIngredients.item} mb-8`} onClick={toggleModal}>
        <img src={ingredient.image} alt={ingredient.name}/>
        <div className={`${styleIngredients.price} mt-2`}>
        <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
        <CurrencyIcon type='primery'/></div>
        <p className={`${styleIngredients.heading} text text_type_main-default mt-2`}>{ingredient.name}</p>
            <Counter count={1} size='default'/>
        {modal && (
            <Modal onCloseModal={toggleModal}>
                <IngredientDetails ingredient={ingredient}/>
            </Modal>
        )}    
        </li>
    )*/

    const dispatch = useDispatch();
    const constructorIngredients = useSelector((store) => store.burgerConstructorReducer);
    const burgerIngredients = useSelector((store) => store.burgerIngredientsReducer);
    
    function openModal() {
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient});
    }

    const [, dragRef, dragPreviewRef] = useDrag({
      type: 'ingredients',
      item: ingredient,
    })

    const counter = useMemo(() => {
        const counters = {};
        burgerIngredients.burgerIngredientsList.forEach((ingredient) => {
            counters[ingredient._id] = constructorIngredients.constructorFillingList.filter(
                (constructorItem) => constructorItem._id === ingredient._id
            ).length;
        });
        if (constructorIngredients.constructorBunElement) {
            counters[constructorIngredients.constructorBunElement._id] = 2;
        }
        return counters;
    }, [constructorIngredients, burgerIngredients]);

    const getIngredientCounter = (ingredientId) => counter[ingredientId];

    return (
        <li ref={dragRef} className={`${styleIngredients.item} mb-8`} onClick={openModal}>
            {getIngredientCounter(ingredient._id) !== 0 && (
                <Counter count={getIngredientCounter(ingredient._id)} size='default'/>
            )}
        <img ref={dragPreviewRef} className={styleIngredients.img} src={ingredient.image} alt={ingredient.name}/>
        <div className={`${styleIngredients.price} mt-2`}>
        <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
        <CurrencyIcon type='primery'/></div>
        <p className={`${styleIngredients.heading} text text_type_main-default mt-2`}>{ingredient.name}</p>
         
       
        </li>
    )
    
}

IngredientsItem.propTypes = {
   ingredient: itemPropTypes,
}


export default IngredientsItem;
