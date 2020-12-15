import React from 'react';
import SharedItemsForm from './SharedItemsForm';
import ItemsList from './ItemsList';

import styles from './SharedItems.module.css';

const SharedItems = () => {
  return (
    <div>
      <div className={styles.formDiv}>
        <SharedItemsForm />
      </div>
      <div>
        <ItemsList />
      </div>
    </div>
  );
};

export default SharedItems;
