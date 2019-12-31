import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const Card = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp
          activeOpacity={0.5}
          onPress={props.onSelect}
          userForeground
        >
          <Image style={styles.image} source={{ uri: props.image }} />

          <View>
            <View style={styles.header}>
              <Text style={styles.name}>
                {props.sitterHandle}
                <Text style={styles.check}>
                  {props.certified && <Ionicons name='md-checkmark' />}
                </Text>
              </Text>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.price}>
                {props.bio}
              </Text>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    alignContent: 'center'
  },
  image: {
    width: '50%',
    height: '60%',
    borderRadius: 90,
    marginLeft: 80,
    marginTop: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  name: {
    marginLeft: 110,
    marginTop: 10,
    marginBottom: 10,
    color: 'purple'
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  },
  header: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    fontSize: 25
  }
});

export default Card;
