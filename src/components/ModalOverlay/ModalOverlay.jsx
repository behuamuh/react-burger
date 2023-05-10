import stylesOverlay from "./ModalOverlay.module.css";

function ModalOverlay({ onCloseModal }) {
  return <div className={stylesOverlay.overlay} onClick={onCloseModal}></div>;
}

export default ModalOverlay;
