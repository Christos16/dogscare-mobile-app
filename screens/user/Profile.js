import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, ScrollView } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Picker,
  Button,
  Textarea,
  Form,
  Item,
  Thumbnail
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import {LinearGradient } from 'expo-linear-gradient';

const Profile = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

const getUser = useCallback(async () => {
    try {
      await dispatch(authActions.getUserData(token));
    } catch (err) {
      console.log(err);
    }
  },[dispatch]);

useEffect(() => {
    setIsLoading(true);
    getUser().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, getUser]);

 
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='purple' />
      </View>
    );
  }
 

  return (

      <ScrollView>
     
    <Container>
   
      <Content>
      <LinearGradient colors={['white', 'lightgrey']} style={styles.gradient}>
      <Thumbnail source={{uri: user.imageUrl}} style={styles.thumbnail}/>
        <List>
         
           
        
          <Item regular style={styles.item}>
        
            <Icon name='pin' style={styles.icon} />
            <Input placeholder='*Address...' style={styles.container} />
          </Item>
          <Text style={styles.info}>
            State your full address (eg. Ermou 69, Syntagma)
          </Text>
          <Item regular style={styles.item}>
            <Icon name='paw' style={styles.icon} />
            <Input placeholder='*Breed...' style={styles.container} />
          </Item>

          <Text style={styles.info}>Tell us the breed of your pet</Text>

          <Form>
            <Item style={styles.item}>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                style={styles.picker}
                placeholder='*Select the size of your pet '
                // placeholderStyle={{ color: 'black' }}
                placeholderIconColor='#007aff'
                selectedValue={() => {}}
                onValueChange={() => {}}
              >
                <Item label='Small (5-10kg' value='Small (5-10kg' />
                <Item label='Medium (15-20kg)' value='Medium (15-20kg)' />
                <Item label='Big (+20kg)' value='Big (+20kg)' />
              </Picker>
            </Item>
          </Form>

          <Item style={styles.item} regular>
            <Icon name='paw' style={styles.icon} />
            <Input
              placeholder='* Pet description...'
              style={styles.container}
            />
          </Item>

          <Text style={styles.info}>
            (e.g Playfull, Sweet, Loves to eat, Afraid of storms ect...)
          </Text>

          <Form style={styles.area}>
            <Textarea rowSpan={3} placeholder='* Short Bio' bordered />
          </Form>

          <Text style={styles.info}>
            {' '}
            Tell us a little about yourself and your pet...
          </Text>
        </List>
        <Button block style={styles.button}>
          <Text>Edit Profile</Text>
        </Button>
          </LinearGradient>
      </Content> 
     
    </Container>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: 11,
    paddingTop: 3,
    textAlign: 'left',
    color: 'grey',
    marginLeft: 10,
    marginTop: 3
  },
  thumbnail: {
      width: 200,
      height: 200,
      marginTop: 10,
      marginLeft: 80
  },
  area: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  item: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 15
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: 'purple'
  },
  container: {
    textAlign: 'left'
  },
  icon: {
    color: 'purple'
  }
});

Profile.navigationOptions = navData => {
  return {
    headerTitle: 'My Profile',
    headerTintColor: 'purple'
  };
};

export default Profile;
