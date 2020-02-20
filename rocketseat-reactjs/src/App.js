import React from 'react';
import Header from './components/Header';
import Main from './pages/main';
import Routes from './routes';

import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes></Routes>
    </div>
  );
}

export default App;
