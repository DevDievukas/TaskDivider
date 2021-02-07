import React, { useReducer, useEffect } from 'react';

import { validate } from '../validators/validators';
import styles from './Input.module.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  let element;
  if (props.element === 'input') {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === 'textarea') {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === 'checkbox') {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === 'radio') {
    element = (
      <label htmlfor={props.id} className={styles.radioDiv}>
        <input
          type="radio"
          id={props.id}
          name="image"
          value={props.src}
          className={styles.radio}
          onChange={changeHandler}
        />
        {<img src={props.src} alt={props.src} className={styles.radioImg} />}
      </label>
    );
  }

  return (
    <div
      className={`${styles.formControl} ${
        !inputState.isValid && styles.formControlInvalid
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && props.errorText && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
