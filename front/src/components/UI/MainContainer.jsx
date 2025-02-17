import React from 'react';
import Header from './Header';

const MainContainer = (props) => (
  <div className="main-container">
    <Header />
    {props.children}
  </div>
);

export default MainContainer;
