import React, { useState } from 'react';

import ExpandedElement from './ExpandedElement';
import styles from './GroupElement.module.css';

const GroupElement = (props) => {
  const [expanded, setExpanded] = useState(false);

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <button className={styles.groupElementBtn} onClick={setExpandedHandler}>
        {props.name}
      </button>
    );
  } else {
    return (
      <div onClick={setExpandedHandler}>
        <ExpandedElement person={props.name} rooms={props.rooms} />
      </div>
    );
  }
};
export default GroupElement;
