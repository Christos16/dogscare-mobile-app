import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch, ActivityIndicator } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import {
  H1,
  Container,
  Thumbnail,
  H3,
  Right,
  List,
  Item,
  Left,
  DatePicker,
  Textarea,
  Form,
  Button
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as authActions from '../../store/actions/auth';
import moment from 'moment';
const BookingSitter = props => {
  const token = useSelector(state => state.auth.token);
  const sitterHandle = props.navigation.getParam('sitterHandle');
  const sitterId = props.navigation.getParam('sitterId');

  const [isLoading, setLoading] = useState(false);
  const [pickUpDate, setPickUpDate] = useState(new Date().toISOString());
  const [comment, setComment] = useState('');
  const [dropDate, setDropDate] = useState(new Date().toISOString());
  const dispatch = useDispatch();

  const from = moment(dropDate).format('L');
  const to = moment(pickUpDate).format('L');

  const pickDate = newDate => {
    setPickUpDate(newDate);
  };

  const droppedDate = newDate => {
    setDropDate(newDate);
  };

  const bookSitter = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(
        authActions.bookNow(token, dropDate, pickUpDate, commment, sitterId)
      );
    } catch (err) {
      console.log('Problem, check again ');
    }
    setLoading(false);
  }, [dispatch, setLoading]);

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size='large' color='purple' />
      </View>
    );
  }

  return (
    <ScrollView>
      <Container>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: 25,
              marginBottom: 20,
              fontSize: 20
            }}
          >
            Time for your pet to be cuddled by a certified pet sitter until your
            return
          </Text>

          <Thumbnail
            style={styles.images}
            source={require('../../assets/walky.jpg')}
          />
        </View>
        <Item style={styles.item}>
          <Left>
            <Text>Drop off:</Text>
            <DatePicker
              defaultDate={new Date(2019, 1, 1)}
              minimumDate={new Date(2019, 1, 1)}
              maximumDate={new Date(2019, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText='Select date'
              textStyle={{ color: 'purple' }}
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              onDateChange={droppedDate}
              disabled={false}
            />
            <Text>Date: {dropDate.toString().substr(4, 12)}</Text>
          </Left>
          <Right>
            <Text>Pick up:</Text>
            <DatePicker
              defaultDate={new Date(2019, 1, 1)}
              minimumDate={new Date(2019, 1, 1)}
              maximumDate={new Date(2019, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText='Select date'
              textStyle={{ color: 'purple' }}
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              onDateChange={pickDate}
              disabled={false}
            />
            <Text>Date: {pickUpDate.toString().substr(4, 12)}</Text>
          </Right>
        </Item>

        <Form>
          <Text
            style={{
              marginBottom: 5,
              marginTop: 20,
              marginLeft: 5,
              color: 'grey'
            }}
          >
            {' '}
            Specify additional comments (Optionals)
          </Text>
          <Textarea
            rowSpan={3}
            bordered
            placeholder='(e.g I will provide the dog food for the 3 days)'
            style={{ marginBottom: 30, marginLeft: 10, marginRight: 10 }}
            onChangeText={text => {
              setComment(text);
            }}
          />
        </Form>
        <Button
          block
          style={styles.button}
          onPress={() =>
            dispatch(authActions.bookNow(token, from, to, comment, sitterId))
          }
        >
          <Text style={styles.text}>Book now </Text>
        </Button>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: 'purple',
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    marginTop: 20
  },
  button: {
    backgroundColor: 'purple',
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    color: 'white'
  },
  item: {
    marginLeft: 20,
    marginRight: 20
  }
});

BookingSitter.navigationOptions = navData => {
  const sitterHandle = navData.navigation.getParam('sitterHandle');
  return {
    headerTitle: `Contact ${sitterHandle} `
  };
};

export default BookingSitter;
