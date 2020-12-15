import React, { useState } from 'react';

import ExpandedElement from './ExpandedElement';

import styles from './Element.module.css';

const Element = (props) => {
  const [expanded, setExpanded] = useState(false);

  const { title, id, type } = props;
  const arrow = '▼';
  if (!expanded) {
    return (
      <div className={styles.div} onClick={() => setExpanded(true)}>
        <h1>{title}</h1>
        <h1>{arrow}</h1>
      </div>
    );
  } else {
    return (
      <ExpandedElement id={id} type={type} onClick={() => setExpanded(false)} />
    );
  }
};

export default Element;
