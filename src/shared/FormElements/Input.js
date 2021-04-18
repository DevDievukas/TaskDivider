import { Field }  from 'formik'
import React      from 'react'

import styles     from './Input.module.css'

const Input = ({ id, name, title, type }) => {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        {type === 'textarea' ?
          <div className={styles.textField}>
            <Field required id={id} name={name} type={type} as='textarea' />
            <div className={styles.underline}></div>
            <label htmlFor={name}>{title}</label>
          </div> :
          <div className={styles.field}>
            <Field required id={id} name={name} type={type} />
            <div className={styles.underline}></div>
            <label htmlFor={name}>{title}</label>
          </div> }
      </div>
    </React.Fragment>
  )
}

export default Input
