import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import Colors from '../../common/Color';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Right,
  Text,
  Button,
  Icon,
  Left,
  Body,
  H3,
  Tabs,
  Tab,
  TabHeading
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import FooterContainer from '../../common/Footer';
import * as sitterActions from '../../store/actions/sitters';
import Ratings from '../../common/Stars';

const SitterDetails = props => {
  const dispatch = useDispatch();

  const sitterId = props.navigation.getParam('sitterId');
  const selectedSitter = useSelector(state =>
    state.sitters.sittersProfile.find(sitter => sitter.sitterId === sitterId)
  );

  const bookSitter = (id, handle) => {
    props.navigation.navigate('Booking', {
      sitterId: id,
      sitterHandle: handle
    });
  };
  return (
    <ScrollView>
      <Container>
        <Content>
          <Image style={styles.image} source={{ uri: selectedSitter.image }} />
          <CardItem>
            <Left>
              <Ratings />
            </Left>
            <Right>
              <Text>
                <Icon style={styles.icon} name='pin' />
                <Text style={styles.text}>{selectedSitter.location}</Text>
              </Text>
            </Right>
          </CardItem>

          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Icon name='contact' />
                  <Text>Qualities</Text>
                </TabHeading>
              }
            >
              <Card>
                <CardItem>
                  <View style={styles.bio} p>
                    <Text style={styles.title}>Bio:</Text>
                    <Text style={styles.bio}> {selectedSitter.bio} </Text>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <View style={styles.divider} />
                    <View style={styles.bio} p>
                      <Text style={styles.title}>Qualifications:</Text>
                      <Text style={styles.bio}>
                        {selectedSitter.Competence}{' '}
                      </Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name='cash' />
                  <Text>Pricing</Text>
                </TabHeading>
              }
            >
              <CardItem>
                <Left style={{ marginLeft: 20 }} transparent>
                  <Text>Price per hour</Text>
                </Left>
                <Right style={{ marginRight: 20 }}>
                  <Text style={styles.vector}>
                    € <H3>{selectedSitter.pricing}</H3>{' '}
                  </Text>
                </Right>
              </CardItem>
            </Tab>

            <Tab
              heading={
                <TabHeading>
                  <Icon name='paw' />
                  <Text>Services</Text>
                </TabHeading>
              }
            >
              <Card>
                <CardItem>
                  <Body>
                    <View style={styles.bio} p>
                      <Text style={styles.title}>Services:</Text>
                      <Text style={styles.bio}>{selectedSitter.services} </Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </Tab>
          </Tabs>
          <Button
            color={Colors.primary}
            title={`Book ${selectedSitter.sitterHandle} now !`}
            onPress={() => {
              bookSitter(selectedSitter.sitterHandle, selectedSitter.sitterId);
            }}
          >
            <Text>Book Sitter</Text>
          </Button>
        </Content>
      </Container>
    </ScrollView>
  );
};

SitterDetails.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('sitterHandle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    marginTop: 5
    // borderRadius: 150,
    // marginLeft: 50
  },
  divider: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  title: {
    color: 'purple',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10
  },
  icon: {
    color: 'purple',
    marginRight: 20,
    fontSize: 20
  },
  text: {
    marginLeft: 10
  },
  location: {
    fontSize: 19,
    marginLeft: 20
  },
  container: {
    width: '100%',
    height: '100%'
  },
  bio: {
    fontSize: 13,
    marginLeft: 10,
    marginRight: 10,
    padding: 2,
    textAlign: 'center'
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  handle: {
    fontSize: 25,
    marginLeft: 90,
    marginBottom: 5,
    textAlign: 'center'
  },
  main: {
    marginTop: 10
  },
  vector: {
    marginRight: 50
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  price: {
    backgroundColor: '#F0EFEE',
    color: 'grey',
    // marginLeft: 10,
    // marginRight: 30,
    marginTop: 0,
    fontSize: 20
  }
});

export default SitterDetails;
