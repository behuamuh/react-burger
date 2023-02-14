import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch  } from 'react-redux';
import { getIngredient } from '../../services/actions/burgerIngredientsAction';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {

const dispatch = useDispatch();
/*const { loading, error, errorText } = useSelector((store) => ({
  loading: store.burgerIngredientsReducer.burgerIngredientsListRequest,
  error: store.burgerIngredientsReducer.burgerIngredientsListError,
  errorText: store.burgerIngredientsReducer.burgerIngredientsListErrorText,
}));*/



useEffect(() => {
  dispatch(getIngredient());
}, [dispatch])



  return (
    <div className={`${styles.App} custom-scroll`}>
    <AppHeader />
    <DndProvider backend={HTML5Backend}>
      <main className={styles.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      </DndProvider>
      </div>
 

  );
}

export default App;

