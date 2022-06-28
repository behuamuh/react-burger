import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerConstractor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';


function App() {
  return (
    <div className={`${styles.App} custom-scroll`}>
      <AppHeader/>
      <main className={styles.content}>
        <BurgerIngredients/>
        <BurgerConstractor/>
      </main>
     
    </div>

  );
}

export default App;
