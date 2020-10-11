import React from 'react';

import './GroupElement.css';

const GroupElement = props => {
  return <button className="group-element-btn" onClick={() => console.log(props.group)} group={props.group}>{props.group.groupName}</button>
}

export default GroupElement;