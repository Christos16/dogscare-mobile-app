import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Content,
  Container,
  Text,
  Body,
  Button,
  Right
} from 'native-base';
import moment from 'moment';

const HistoryCard = props => {
  const createdTime = moment(props.createAt).format('MMMM Do YYYY, h:mm:ss a');
  const from = moment(props.from).format('MMMM Do YYYY');
  const to = moment(props.to).format('MMMM Do YYYY');

  return (
    <List>
      <ListItem itemDivider style={styles.divider}>
        <Text>{createdTime}</Text>
      </ListItem>
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={{ uri: props.sitterImage }} />
        </Left>
        <Body>
          <Text style={styles.handle}>{props.sitterHandle}</Text>
          <View>
            <Text style={styles.fee}>Sitter's Fee:</Text>
            <Text style={styles.pricing}>{props.pricing}</Text>
          </View>
          <Text style={styles.fee}>Services:</Text>
          <Text style={styles.pricing}>{props.services}</Text>
          <Text note style={styles.comment}>
            {props.comment ? (
              props.comment
            ) : (
              <Text>You did not mention any comment</Text>
            )}
          </Text>
        </Body>
        <Right>
          <Text style={styles.time}>From:</Text>
          <Text transparent style={{ marginBottom: 20 }}>
            <Text>{from}</Text>
          </Text>
          <Text style={styles.time}>To:</Text>
          <Text transparent>
            <Text>{to}</Text>
          </Text>
        </Right>
      </ListItem>
    </List>
  );
};

const styles = StyleSheet.create({
  handle: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 20,
    color: 'purple'
  },
  fee: {
    fontWeight: '500',
    marginBottom: 5
  },
  pricing: {
    //marginLeft: 20,
    color: 'grey',
    marginBottom: 15
  },
  comment: {
    marginBottom: 10
  },
  time: {
    fontWeight: '500',
    marginBottom: 5,
    marginRight: 40
  },
  divider: {
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default HistoryCard;
