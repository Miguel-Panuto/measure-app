import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const LandPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('id');
  }, [])

  const sendIdHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    localStorage.setItem('id', userId);
    history.push('/data');
  } 
  return (
    <Container>
      <form onSubmit={sendIdHandler}>
        <label htmlFor="userId">ID</label>
        <input
          required 
          type="text" 
          name="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button type="submit">Coletar</button>
      </form>
      
    </Container>
  );
}

export default LandPage;