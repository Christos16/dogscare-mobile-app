import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import SittersProfile from './screens/sitters/SittersProfile';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import sittersReducer from './store/reducers/sitters';
import ReduxThunk from 'redux-thunk';
import * as authActions from './store/actions/auth'
import authReducer from './store/reducers/auth'
import NavigationContainer from './navigation/NavigationContainer'

const rootReducer = combineReducers({
  sitters: sittersReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

class App extends React.Component  {
  
  render() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
