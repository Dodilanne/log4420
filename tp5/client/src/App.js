import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureAxios } from './foundation/config/api-config';
import { createStore } from './foundation/config/store-config';
import Router from './foundation/Router/Router';

configureAxios();

const { store, persistor } = createStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
