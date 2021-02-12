import React from 'react';
import { useFormik } from 'formik';

import styles from './Auth.module.css';

const Login = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      houseName: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.authForm}>
      <div className={styles.formControl}>
        <label htmlFor="email">NAME OF THE HOUSE</label>
        <input
          id="houseName"
          name="houseName"
          type="houseName"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">password</label>
      </div>
      <div className={styles.formControl}>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
