import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';
import Main from '../components/Main/Main';
import Modal from '../components/Modal/Modal';
import { RESET_CURRENT_INGREDIENT } from '../services/actions/currentIngredientAction';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentIngredient = useSelector(
        (store) => store.currentIngredientReducer.currentIngredient
    );
    function closeModal(e) {
        e.stopPropagation();
        dispatch({ type: RESET_CURRENT_INGREDIENT});
        navigate("/");
      }

      return (
        <>
        <AppHeader/>
        <Main/>
        {currentIngredient && (
            <Modal onCloseModal={closeModal}>
                <IngredientDetails ingredient={currentIngredient}/>
            </Modal>
        )}
        </>
      )

}