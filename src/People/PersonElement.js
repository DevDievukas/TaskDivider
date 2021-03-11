import { Trash }    from 'phosphor-react';
import { useState } from 'react';
import React        from 'react';

import Button       from '../shared/FormElements/Button';
import Modal        from '../shared/UIElements/Modal';

import styles       from './PersonElement.module.css';
import RoomsModal   from './RoomsModal';

const PersonElement = (props) => {
  const [showRoomsModal, setShowRoomsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { token, name, id, onDelete } = props;

  const revealRoomsModal = () => {
    setShowRoomsModal(true);
  };

  const closeRoomsModal = () => {
    setShowRoomsModal(false);
  };

  const revealDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deletePersonHandler = async (event) => {
    event.preventDefault();
    onDelete(id);
  };

  return (
    <React.Fragment>
      {showRoomsModal ? (
        <RoomsModal
          show={showRoomsModal}
          close={closeRoomsModal}
          personId={id}
          token={token}
        />
      ) : null}
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModal}
        header="Delete person"
        onSubmit={deletePersonHandler}
      >
        <Button onClick={closeDeleteModal} type="button" cancel>
          CANCEL
        </Button>
        <Button type="submit">DELETE</Button>
      </Modal>
      <li className={styles.personCard}>
        <h6 className={styles.title}>{name}</h6>
        <p className={styles.rooms} onClick={revealRoomsModal}>
          Rooms
        </p>
        <Trash
          size={24}
          className={styles.deleteBtn}
          onClick={revealDeleteModal}
        />
      </li>
    </React.Fragment>
  );
};

export default PersonElement;
