import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { React, useContext, useMemo, useEffect } from 'react';
import useState from 'react';
import IngredientsItem from '../BurgerIngredients/IngredientsItem/IngredientsItem';
import stylesConstructor from './BurgerConstractor.module.css';
import itemPropTypes from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';
import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';
import ConstructorOrder from '../ConstracturOrder/ConstructorOrder';
import { FinalPriceContext } from '../../services/burger-ingredients-context';


function BurgerConstractor() { 
  const ingredients = useContext(BurgerIngredientsContext); 
  const { constructorContext, setConstructorContext } = useContext(
    BurgerConstructorContext
  );

  

  const getIngredient = useMemo(() => { 
    return ingredients.slice(0, Math.round(Math.random() * 7) + 3);
  }, [ingredients]);

  const getBun = useMemo(() => {
    return getIngredient.find((item) => item.type === 'bun');
  }, [getIngredient]);

  const { getFilling } = useMemo(() => {
    return getIngredient.reduce(
      (count, item) => {
        if (item.type !== 'bun') {
          count.getFilling.push(item);
        }
        return count;
      }, { getFilling: []}
    );
  }, [getIngredient]);



  const totalPrice = useMemo(() => {
    const counter =
    getBun.price * 2 + getFilling.reduce((sum, item) => sum + item.price, 0);
    return counter;
  }, [getBun, getFilling]);

  useEffect(() => {
    setConstructorContext({
      ...constructorContext,
      buns: [...constructorContext.buns, getBun],
      ingredients: getFilling,
      id: [
        getBun._id,
        ...getFilling.map((item) => item._id),
        getBun._id,
      ],
      price: totalPrice,
    });
  }, []);



  return (
    <section className={`${stylesConstructor.section} ml-10 mt-20`}>
      
      <div className={stylesConstructor.container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${getBun.name} (верх)`}
          price={getBun.price}
          thumbnail={getBun.image}

        />

        <ul className={`${stylesConstructor.list} custom-scroll`}>
          {constructorContext.ingredients.map((item, index) => {
            if (item.type === 'main' || item.type === 'sauce') 
              return (
              <li className={`${stylesConstructor.item} mt-4 pr-5`} key={index}>
                <DragIcon/>
                <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                
                />
              </li>
            )
          }
          )}
        </ul>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${getBun.name} (низ)`}
          price={getBun.price}
          thumbnail={getBun.image}
          />

        
      </div>

    
      <ConstructorOrder/>

    </section>
  )
}



export default BurgerConstractor;