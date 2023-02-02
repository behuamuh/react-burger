import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useState } from 'react';
import { BurgerConstructorContext } from '../../utils/burger-constructor-context';
import { BurgerIngredientsContext } from '../../utils/burger-ingredients-context';
import { getIngredients } from '../../utils/api';



function App() {
 const [data, setData] = React.useState([]);
 const [err, setErr] = React.useState('');

 const [constructorContext, setConstructorContext] = useState({
    buns: [],
    ingredients: [],
    id: [],
    price: 0,
 });

 React.useEffect(() => {
  getIngredients()
   .then((data) => {
    setData(data.data);
   })
   .catch((err) => {
    console.log(err);
    setErr(err);
   })

 
   
 }, []);

 /*const [order, setOrder] = useState(undefined);*/

  return (
    <div className={`${styles.App} custom-scroll`}>
      <AppHeader/>
      <main className={styles.content}>
      <BurgerIngredientsContext.Provider value={data}>
              <BurgerConstructorContext.Provider
                value={{
                  constructorContext,
                  setConstructorContext,
                 /* order,
                  setOrder,*/
                }}
              >
                {data.length && (
                  <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </>
                )}
              </BurgerConstructorContext.Provider>
            </BurgerIngredientsContext.Provider>
      </main>
     
    </div>

  );
}

export default App;

