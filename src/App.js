import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import api from './service/coreApi';

function App() {

  const [ users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await api.getUsers();
    console.log('resultado');
    setUsers(result);
    console.log(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {users.map((user) => (
              <p>{user.nome}</p>
          ))}
      </header>
    </div>
  );
}

export default App;
