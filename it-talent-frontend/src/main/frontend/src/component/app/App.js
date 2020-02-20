import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainArea from '../mainarea/MainArea';
import './App.css';

const App = () =>
{
  return (
    <div className="app flexItemsRow">
      <Header />
      <MainArea />
      <Footer />
    </div>
  );
}


export default App;