import { useContext, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';
import orderStyles from './ConstructorOrder.module.css';
import Modal  from '../Modal/Modal';
import icon from '../../images/Subtract.svg';
import OrderDetails
 from '../OrderDetails/OrderDetails';
import { apiOrder } from '../../utils/api';
import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';



export default function ConstructorOrder() {
    const [modal, setModal] = useState(false);
    const [ setConstructorContext, setOrder] = useState(0);
    
    const { constructorContext } = useContext(
      BurgerConstructorContext
    );
    
 

    const ingredients = useContext(BurgerIngredientsContext);



    function makeOrder()  {
      const arrayId = ingredients.map((item) => item._id.toString());
      apiOrder(arrayId)
       .then((res) => {
        setOrder(res.order.number);
     
       })
       .then(() => {
        toggleModal();
       })
       .catch((err) => console.log(`Ошибка при отправке заказа ${err}`))
    }



    function toggleModal() {
        setModal((prevModal) => !prevModal);
    }
    return (
        <div className={orderStyles.order}>
      <div className={orderStyles.price}>
        <p className="text text_type_digits-medium">
        {constructorContext.price}
        </p>
        <img src={icon} alt="Знак валюты" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={makeOrder}>
        Оформить заказ
      </Button>
      {modal && (
        <Modal onCloseModal={toggleModal}>
          <OrderDetails orderNumber={setConstructorContext}/>
        </Modal>
      )}
    </div>
    )
}
