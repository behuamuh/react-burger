import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import fillingListStyle from './ConstructorFillingList.module.css';
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../services/actions/burgerConstructorAction";
import { Reorder } from 'framer-motion';

export default function ConstructorFillingList({ filling }) {
    const dispatch = useDispatch();

    return (
        <Reorder.Item whileDrag={{ scale: 0.8 }} value={filling} className={fillingListStyle.item}>
        
        <DragIcon/>
        <ConstructorElement
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() =>
          dispatch({ type: DELETE_INGREDIENT, payload: filling })
        }
      />
      </Reorder.Item>
    )
}