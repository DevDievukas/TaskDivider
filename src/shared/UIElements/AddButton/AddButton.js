import React from 'react';

import styles from './AddButton.module.css';

const AddButton = (props) => {
  const { clicked, btnText } = props;
  return (
    <button onClick={clicked} className={styles.addBtn}>
      {btnText}
    </button>
  );
};

export default AddButton;
