import React from 'react';
import InputArea from './components/inputArea';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        {/* Add routes here if you have other components */}
        {/* Example route */}
        {/* <Route path="/" element={<YourExistingComponent />} /> */}
      </Routes>
      <InputArea /> {/* Component to be rendered */}
    </div>
  );
}

export default App;
