import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import useState from 'react';
import IngredientsItem from '../BurgerIngredients/IngredientsItem/IngredientsItem';
import stylesConstructor from './BurgerConstractor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import itemPropTypes from '../../utils/prop-types';
import PropTypes from 'prop-types';


function BurgerConstractor({data}) {
  const [modal, setModal] = React.useState(false);

  function toggleModal() {
    setModal((prevModal) => !prevModal);
  }

  return (
    <section className={`${stylesConstructor.section} ml-10 mt-20`}>
      
      <div className={stylesConstructor.container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}

        />

        <ul className={`${stylesConstructor.list} custom-scroll`}>
          {data.map((item, index) => {
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
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
          />

        
      </div>
      <div className={`${stylesConstructor.total} mr-8 mt-10`}>
        <div className={`${stylesConstructor.price} mr-10`}>
          <p className='text text_type_digits-medium mr2'>1981</p>
          <CurrencyIcon/>
        </div>
        <Button type='primary' size='large' onClick={toggleModal}>Оформить заказ</Button>
        {modal && (
          <Modal onCloseModal={toggleModal}>
            <OrderDetails/>
          </Modal>
        )

        }
      </div>

    </section>
  )
}

BurgerConstractor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes).isRequired,
}

export default BurgerConstractor;