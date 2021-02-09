import React, { useState } from 'react';

import ExpandedElement from './ExpandedElement';
import styles from './GroupElement.module.css';

const GroupElement = (props) => {
  const { name, rooms } = props;
  const [expanded, setExpanded] = useState(false);

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <button className={styles.groupElementBtn} onClick={setExpandedHandler}>
        {name}
      </button>
    );
  } else {
    return (
      <div onClick={setExpandedHandler}>
        <ExpandedElement person={name} rooms={rooms} />
      </div>
    );
  }
};
export default GroupElement;
