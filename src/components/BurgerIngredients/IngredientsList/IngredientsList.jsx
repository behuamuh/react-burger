import React from 'react';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import styleIngredientList from './IngredientsList.module.css';
import data from '../../../utils/data';
import PropTypes from 'prop-types';

function IngredientsList(props) {
    const items = data.filter(item => item.type === props.category.type);
    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{props.category.name}</p>
            <ul className={styleIngredientList.list}>
                {items.map(item => (
                    <IngredientsItem key={item.id} item={item}/>
                ))}
            </ul>
        </li>
    )
}
IngredientsList.propTypes = {
    category: PropTypes.object.isRequired
}
export default IngredientsList;