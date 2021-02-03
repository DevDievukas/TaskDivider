import React, { useState, useEffect } from 'react';
import Form from './Form';

import { useHistory } from 'react-router';

const SharedItemsForm = (props) => {
  const [initialName, setInitialName] = useState('');

  let history = useHistory();

  useEffect(() => {
    console.log('[useEffect]');
    const name = localStorage.getItem('Vardas');
    console.log(name);
    setInitialName(name);
  }, []);

  // if (initialName === '') {
  //   return <h1>Ups įvyko klaida, rašyk norbiui</h1>;
  // } else {
  return <Form name={initialName} close={() => history.push('/main')} />;
  // }
};

export default SharedItemsForm;
