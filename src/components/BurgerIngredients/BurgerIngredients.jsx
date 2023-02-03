import { React, useMemo, useState, useEffect, useContext } from 'react';
import stylesIngredients from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './IngredientsList/IngredientsList';
import itemPropTypes from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';




 function BurgerIngredients() { 
  const [current, setCurrent] = useState('one');

  const ingredients = useContext(BurgerIngredientsContext);

  const { buns, mains, sauces } = useMemo(() => {
    return ingredients.reduce(
      (count, item) => {
         switch (item.type) {
          case "bun":
            count.buns.push(item);
            break;
          case "sauce":
            count.sauces.push(item);
            break;
          case "main":
            count.mains.push(item);
            break;
        }
        return count;
      },
      { buns: [], mains: [], sauces: [] }
    );
  }, [ingredients]);

  

  return (
    <section className={stylesIngredients.section}>
    <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div className={stylesIngredients.menu}> 
          <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>

            <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
    </div>
    <div className={`${stylesIngredients.list} custom-scroll`}>
    <IngredientsList
          title="Булки"
          id="bun"
          type="bun"
          ingredients={buns}
        />
        <IngredientsList
          title="Соусы"
          id="sauce"
          type="sauce"
          ingredients={sauces}
        />
        <IngredientsList
          title="Начинки"
          id="main"
          type="main"
          ingredients={mains}
        />
    </div>
    </section>
  )
}

export default BurgerIngredients;




