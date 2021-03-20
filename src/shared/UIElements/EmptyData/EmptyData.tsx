import React from 'react';

import styles from './EmptyData.module.css';

type Props = {
  header: string
}


const EmptyData = (props: Props) => {
  const { header } = props;
  return (
    <div className={styles.div}>
      <h3>{header}</h3>
      <img
        src="https://res.cloudinary.com/dgegci4ii/image/upload/v1612861627/Empty_State_wcxslo.png"
        alt="Nothing found"
      />
    </div>
  );
};

export default EmptyData;
