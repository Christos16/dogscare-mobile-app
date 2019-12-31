import React from 'react';
import { Text } from 'react-native';
import { H1 } from 'native-base';

const BookingSitter = () => {
  return (
    <H1
      style={{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        height: 50  }}
    >
      Booking{' '}
    </H1>
  );
};

BookingSitter.navigationOptions = navData => {
  return {
    headerTitle: 'Booking'
  };
};

export default BookingSitter;
