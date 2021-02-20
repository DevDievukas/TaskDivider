import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop';
import styles from '../Modal.module.css';

const ModalOverlay = (props) => {
  const content = (
    <div className={`${styles.modal} `}>
      <header className={`${styles.modalHeader} ${props.headerClass}`}>
        <h4>{props.header}</h4>
      </header>

      <div className={styles.modalContent}>{props.form}</div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('formModal-hook')
  );
};

const FormModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={50}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default FormModal;

//   return (
//     <Modal
//       onCancel={props.onClear}
//       header="An Error Occurred!"
//       show={show}
//       footer={<Button onClick={props.onClear}>Okay</Button>}
//       form={form}
//     >
//       {/* {form} */}
//     </Modal>
//   );
// };
