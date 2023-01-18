import  React  from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesModal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';


const modalRoot = document.getElementById('react-modals');

function Modal({children, onCloseModal}) {
  function handleEscClose(e) {
    if (e.key  === 'Escape') {
        onCloseModal(e);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
        document.removeEventListener('keydown', handleEscClose);
    };
  }, []);





    return ReactDOM.createPortal(
        (
          <>
          <div className={stylesModal.container} onClick={(e) => e.stopPropagation()}>
            <button type='button' className={stylesModal.button} onClick={onCloseModal}>
                <CloseIcon />
            </button>
              {children}
          </div>
             <ModalOverlay onCloseModal={onCloseModal}/>
          
          </>  

        ),
        modalRoot
    );
}




export default Modal;

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}