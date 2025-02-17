import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';

const Header = () => {
  const { token, logout } = useContext(AuthContext); // Получаем пользователя и функцию выхода

  return (
    <header>
      <h1>Web - programming | Laboratory work no. 4</h1>
      <div>
        <h2>Var no.430450</h2>
        <div id="credit">
          <a href="https://github.com/Umchik1222">Sadovoy Grigory Vladimirovich | P3207</a>
        </div>
      </div>
     
      {/* Добавляем кнопку выхода, если пользователь вошел */}
      {token && (
         <div id='logout-container'>
          <div id='username-block'>{localStorage.getItem('username')}</div>
        <button onClick={logout} className='logout-button'>
          Logout
        </button>
         </div>
        
      )}
    </header>
  );
};

export default Header;