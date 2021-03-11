import { useState }     from 'react';
import React            from 'react';

import ExpandedElement  from './ExpandedElement';
import styles           from './GroupElement.module.css';

const GroupElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  
  const { name, rooms } = props;
  
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
