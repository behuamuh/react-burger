import { useParams } from "react-router-dom";
import style from "./order-page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredient } from "../../services/actions/burgerIngredientsAction";
import {

  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import BurgerDetails from "../../components/BurgerDetails/BurgerDetails";
import { WS_URL_ALL, WS_URL_PROFILE } from "../../utils/variables";

export default function OrderPage({ isAuth }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredient());
    isAuth
      ? dispatch(wsConnectionStart(WS_URL_PROFILE))
      : dispatch(wsConnectionStart(WS_URL_ALL));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch, isAuth]);

  const orders = useSelector((store) => store.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  return (
    order && (
      <section className={style.maim}>
        <BurgerDetails titleClassName={style.title} />
      </section>
    )
  );
}
