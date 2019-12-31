import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SET_USER = 'SET_USER';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, token: token, userId: userId });
  };
};

export const signUp = (email, password, confirmPassword, handle) => {
  return async dispatch => {
    const response = await fetch(
      'https://europe-west1-dogs-care.cloudfunctions.net/api/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          handle: handle,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.general;
      let message = 'Something went wrong!';
      if (errorMessage === 'Handle already taken') {
        message = 'Handle already taken';
      } else if (errorMessage === 'Passwords must match') {
        message = 'Passwords must match';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://europe-west1-dogs-care.cloudfunctions.net/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.general;
      let message = 'Something went wrong!';
      if (errorMessage === 'Wrong credentials, please try again') {
        message = 'Wrong credentials, please try again';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    //dispatch(getUserData(resData.token));

    const decodedToken = jwtDecode(resData.token);
    console.log(decodedToken);
    dispatch(
      authenticate(
        decodedToken.user_id,
        resData.token,
        parseInt(decodedToken.exp) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(decodedToken.exp) * 1000
    );
    saveToStorage(resData.token, decodedToken.user_id, expirationDate);
  };
};

export const getUserData = token => {
  return async dispatch => {
    const response = await fetch(
      'https://europe-west1-dogs-care.cloudfunctions.net/api/user',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorMessage = errorResData.general;
      let message = 'Credentials error!';
      if (errorMessage === 'Wrong credentials, please try again') {
        message = 'Wrong credentials, please try again';
      }
      throw new Error(errorResData);
    }

    const resData = await response.json();
    dispatch({ type: SET_USER, user: resData.credentials });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
const saveToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
