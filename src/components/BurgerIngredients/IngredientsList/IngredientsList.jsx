import React from 'react';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import styleIngredientList from './IngredientsList.module.css';
import PropTypes from 'prop-types';
import itemPropTypes from '../../../utils/prop-types';



const IngredientsList = React.forwardRef((props, ref) => {
    return (
      <>
      <p ref={ref} id={props.id} className='text text_type_main-medium mt-10 mb-6'>
        {props.title}
      </p>
      <ul className={styleIngredientList.list}>
        {props.ingredients.map((item) => {
            return <IngredientsItem key={item._id} ingredient={item}/>
        })}
      </ul>
      
      </>


    )
})


IngredientsList.propTypes = {
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(itemPropTypes),
}

export default IngredientsList;