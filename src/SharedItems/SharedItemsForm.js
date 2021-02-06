import React, { useState, useEffect } from 'react';
import Form from './Form';

import { useHistory } from 'react-router';

const SharedItemsForm = (props) => {
  const [initialName, setInitialName] = useState('');

  let history = useHistory();

  useEffect(() => {
    const name = localStorage.getItem('Vardas');
    setInitialName(name);
  }, []);

  return <Form name={initialName} close={() => history.push('/main')} />;
};

export default SharedItemsForm;
