import { Link }      from 'react-router-dom'
import React         from 'react'

import {
  AddButton,
  ButtonInner,
}                    from './styled'
import styles        from './Button.module.css'

const Button = (props) => {

  const {
    href,
    inverse,
    danger,
    children,
    exact,
    to,
    className,
    cancel,
    type,
    onClick,
    disabled,
    add,
  } = props
  
  if (href) {
    return (
      <a
        className={`${styles.button}  ${
          inverse && styles.buttonInverse
        } ${danger && styles.buttonDanger}`}
        href={href}
      >
        {children}
      </a>
    )
  }
  else if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`${styles.button}  ${
          inverse && styles.buttonInverse
        } ${danger && styles.buttonDanger}`}
      >
        {children}
      </Link>
    )
  }
  else if (add) {
    return (
      <AddButton
        onClick={onClick}
      >
        <ButtonInner>
        +
        </ButtonInner>
      </AddButton>)
  } else
    return (
      <button
        className={`${styles.button} ${className} ${
          danger && styles.buttonDanger
        } ${cancel && styles.buttonCancel} `}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
}

export default Button
