import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureAxios } from './foundation/config/api-config';
import { createStore } from './foundation/config/store-config';
import Router from './foundation/Router/Router';

configureAxios();

/*
* README @chargé :
* Our implementation relies on the use a Redux store, which allows
* us to keep an application level state that persists throught navigation.
* After an initial fetch of the data (see the Router component), components then
* obtain their data directly from the Redux store throught the use of the useSelector
* hook. This removes the need of constantly fetching data from the server and passing 
* heavy objects throught component props. The store state is kept up to date by dispatching
* a corresponding Redux action whenever a state modifying request is successfully processed
* by the server (See client/foundation/thunks).
**/
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
