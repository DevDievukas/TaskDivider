import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`${styles.button}  ${
          props.inverse && styles.buttonInverse
        } ${props.danger && styles.buttonDanger}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${styles.button}  ${
          props.inverse && styles.buttonInverse
        } ${props.danger && styles.buttonDanger}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.button}  ${props.inverse && styles.buttonInverse} ${
        props.danger && styles.buttonDanger
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
