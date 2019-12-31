import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Ratings from '../../common/Stars';

const CardBase = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp activeOpacity={0.5} onPress={props.onSelect} userForeground>
      <Content style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: props.image }} />
              <Body>
                <Text style={styles.handle}>
                  {props.sitterHandle}{' '}
                  <Text>
                    {props.certified && (
                      <Ionicons
                        style={styles.icon}
                        name='md-checkmark-circle'
                      />
                    )}
                  </Text>
                </Text>
              </Body>
            </Left>
            <Right>{props.children}</Right>
          </CardItem>
          <CardItem cardBody>
            <Text ellipsizeMode='tail' numberOfLines={2} style={styles.bio}>
              {props.bio}
            </Text>
          </CardItem>
          <CardItem>
            <Left style={{ marginTop: 5 }}>
              <Ratings />
            </Left>
            <Body>
              <Button transparent>
                <Icon style={styles.icon} name='pin' />
                <Text style={styles.text}>{props.location}</Text>
              </Button>
            </Body>
            <Right>
              <Button transparent>
                <Icon style={styles.icon} active name='cash' />
                <Text style={styles.text}>{props.price}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'purple',
    marginLeft: 5
  },
  text: {
    color: 'black',
    marginRight: 15
  },
  handle: {
    fontSize: 15
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 7,
    shadowOpacity: 0.1,
    shadowRadius: 0.5
  },
  bio: {
    marginLeft: 10,
    marginRight: 10
  }
});
export default CardBase;
