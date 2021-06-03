import { createContext, useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.background} onClick={onClose}></div>
      <div className={styles.content}>{children}</div>
    </div>,
    modalNode
  );
};
