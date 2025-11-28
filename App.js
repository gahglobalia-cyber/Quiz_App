import React from 'react';
import Navigation from './src/navigation/Navigation';
import {ToastProvider} from 'react-native-toastier';
import {Provider} from 'react-redux';
import {persistedStore, store} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <ToastProvider position="top" duration={2000}>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Navigation />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
