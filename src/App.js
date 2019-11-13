import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import SafeDeposit from './components/safe-deposit/SafeDeposit';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SafeDeposit />
      </div>
    </Provider>
  );
}

export default App;
