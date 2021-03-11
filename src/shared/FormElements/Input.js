import { Field }  from 'formik';
import React      from 'react';

import styles     from './Input.module.css';

const Input = (props) => {
  const { id, name, title, type } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <Field required id={id} name={name} type={type} />
        <div className={styles.underline}></div>
        <label htmlFor={name}>{title}</label>
      </div>
    </div>
  );
};

export default Input;
