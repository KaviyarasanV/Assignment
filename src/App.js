import React from 'react';
import AppRouter from './Route/Routes';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducer/RootReducer';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/font-awesome/css/all.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
function App() {
  let store = createStore(rootReducer);
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
