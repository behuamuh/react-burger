import { useEffect } from 'react';
import styles from './Main.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch  } from 'react-redux';
import { getIngredient } from '../../services/actions/burgerIngredientsAction';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function Main() {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getIngredient());
}, [dispatch])



  return (
    <div className={`${styles.App} custom-scroll`}>
    <DndProvider backend={HTML5Backend}>
      <section className={styles.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
      </DndProvider>
      </div>
 

  );
}

export default Main;