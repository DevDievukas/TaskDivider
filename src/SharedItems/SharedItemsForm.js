import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

import { useHistory } from 'react-router';

const SharedItemsForm = (props) => {
  const houseParam = useParams().houseId;
  const [initialName, setInitialName] = useState('');

  let history = useHistory();

  useEffect(() => {
    const name = localStorage.getItem('Vardas');
    setInitialName(name);
  }, []);

  return <Form name={initialName} close={() => history.push(`/`)} />;
};

export default SharedItemsForm;
