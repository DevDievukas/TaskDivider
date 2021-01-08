import React, { useEffect, useReducer } from 'react';
import { validate } from '../validators/validators';

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

const InputSelector = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: true,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <select id={props.id} name={props.name} onChange={handleChange}>
        {props.children}
      </select>
    </React.Fragment>
  );
};

export default InputSelector;
