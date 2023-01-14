import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import getIngredients from '../../utils/api';



function App() {
 const [data, setData] = React.useState([]);
 const [err, setErr] = React.useState('');


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

  return (
    <div className={`${styles.App} custom-scroll`}>
      <AppHeader/>
      <main className={styles.content}>
     
        <BurgerIngredients data={data}/> 
        <BurgerConstractor data={data}/>
      </main>
     
    </div>

  );
}

export default App;

