import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
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
  Thumbnail,
  Label,
  Toast,
  Footer
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/layouts/HeaderButton';
import ImageSelector from '../../components/layouts/ImageSelector';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import {SET_USER} from "../../store/actions/auth"

const Profile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [personality, setPersonality] = useState('');
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImage, setPickedImage] = useState();
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [display, setDisplay] = useState(false);

  const profileCreation = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(
        authActions.createProfile(
          token,
          breed,
          personality,
          location,
          size,
          bio
        )
      );
      console.log(token);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    props.navigation.navigate('Main');
  }, [dispatch]);

  const getUser = useCallback(async () => {
   
    try {
      await dispatch(authActions.getUserData(token))

    } catch (err) {
      console.log(err);
    }
    console.log(breed)
    
  }, [dispatch, setIsLoading]);

  const handleImageChange = useCallback(async () => {
    try {
      await dispatch(authActions.uploadImage(pickedImage));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
      const response = await fetch(
        'https://europe-west1-dogs-care.cloudfunctions.net/api/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const resData = await response.json();

      setBreed(resData.credentials.breed);
      setLocation(resData.credentials.location);
      setBio(resData.credentials.bio);
      setPersonality(resData.credentials.personality);
      setSize(resData.credentials.size);
      setPickedImage(resData.credentials.imageUrl);
      setFacebook(resData.credentials.facebook);
      setInstagram(resData.credentials.instagram);
      setLinkedin(resData.credentials.linkedin);
      setTwitter(resData.credentials.twitter);
     
      setIsLoading(false);
  
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
      


      dispatch({ type: SET_USER, user: resData.credentials })
    }, [dispatch, setIsLoading])
  
    //Listening for refreshing the component when re-opened with previously modified state
    useEffect(() => {
      const willRefresh = props.navigation.addListener('willFocus', fetchUser)
      return () => {
        willRefresh.remove()
      }
    }, [fetchUser])
  

  useEffect(() => { 
    fetchUser()
  },[ dispatch ,fetchUser])
  
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='purple' />
      </View>
    );
  }

  const imageTakenHanlder = imagePath => {
    setSelectedImage(imagePath);
  };

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(image.uri);
    if (!image.cancelled) {
      setPickedImage(image.uri);
    }
  };

  const takeAndUploadPhotoAsync = async () => {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    console.log(localUri);
    let filename = localUri.split('/').pop();
    console.log(filename);

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type: type });
    return await fetch(
      'https://europe-west1-dogs-care.cloudfunctions.net/api/user/image',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log('response' + JSON.stringify(res));
      })
      .catch(e => console.log(e));
  };

  //Redirecting

  const redirectToMain = () =>{
    props.navigation.navigate('SittersOverview')
  }

  const createProfile = async () => {
    /*  const credentialsData = {
      breed: breed,
      size: size,
      personality: personality,
      location: location,
      bio: bio,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin
  };*/

    return await fetch(
      'https://europe-west1-dogs-care.cloudfunctions.net/api/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          breed: breed,
          size: size,
          personality: personality,
          location: location,
          bio: bio,
          instagram: instagram,
          facebook: facebook,
          twitter: twitter,
          linkedin: linkedin
        })
      }
    )
      .then(res => {
        console.log('Success');
      })
      .catch(e => console.log('problem with token'));
   

  };
  /*if (!response.ok) {
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
    }; */

  let socialDisplay;

  if (display) {
    socialDisplay = (
      <View>
        <Item>
        <Icon active name='logo-instagram' />
        <Input
          placeholder='Instagram'
          value={instagram}
          style={styles.container}
          onChangeText={text => {
            setInstagram(text);
          }}
        />
        </Item>
        <Item>
        <Icon active name='logo-facebook' />
        <Input
          placeholder='Facebook'
          value={facebook}
          style={styles.container}
          onChangeText={text => {
            setFacebook(text);
          }}
        />
        </Item>
        <Item>
        <Icon active name='logo-linkedin' />
        <Input
          placeholder='Linkedin'
          value={linkedin}
          style={styles.container}
          onChangeText={text => {
            setLinkedin(text);
          }}
        />
        </Item>
        <Item>
        <Icon active name='logo-twitter' />
        <Input
          placeholder='Twitter'
          value={twitter}
          style={styles.container}
          onChangeText={text => {
            setTwitter(text);
          }}
        />
        </Item>
      </View>
    );
  }

  return (
    
     <Container>
       <KeyboardAvoidingView keyboardVerticalOffset={100}>
    <ScrollView>
     
       
     
            <LinearGradient
              colors={['white', 'white']}
              style={styles.gradient}
            >
              <View style={styles.background}>
                <Thumbnail
                  source={{ uri: pickedImage }}
                  style={styles.thumbnail}
                />
                <Text style={styles.handle}>{user.handle}</Text>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Button
                    small
                    onPress={takeAndUploadPhotoAsync}
                    style={{ marginBottom: 10 }}
                    style={styles.gallery}
                  >
                    <Text style={{ color: 'purple' }}>Open Gallery</Text>
                    <Icon name='create' style={styles.icon} />
                  </Button>
                </View>
              </View>

              <List style={styles.list}>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Address</Label>
                  <Input
                    placeholder='*Address...'
                    value={location}
                    style={styles.container}
                    onChangeText={text => {
                      setLocation(text);
                    }}
                    required
                  />
                </Item>
                <Text style={styles.info}>
                  State your full address (eg. Ermou 69, Syntagma)
                </Text>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Breed</Label>
                  <Input
                    placeholder='*Breed...'
                    style={styles.container}
                    onChangeText={text => {
                      setBreed(text);
                    }}
                    value={breed}
                    required
                  />
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
                      selectedValue={size}
                      onValueChange={(itemValue, itemIndex) => {
                        setSize(itemValue);
                      }}
                      required
                    >
                      <Item label='Small (5-10kg' value='Small (5-10kg' />
                      <Item label='Medium (15-20kg)' value='Medium (15-20kg)' />
                      <Item label='Big (+20kg)' value='Big (+20kg)' />
                    </Picker>
                  </Item>
                </Form>

                <Item style={styles.item} floatingLabel>
                  <Label style={styles.label}>Pet description</Label>
                  <Input
                    placeholder='* Pet description...'
                    style={styles.container}
                    value={personality}
                    onChangeText={text => {
                      setPersonality(text);
                    }}
                    required
                  />
                </Item>

                <Text style={styles.info}>
                  (e.g Playfull, Sweet, Loves to eat, Afraid of storms ect...)
                </Text>

                <Form style={styles.area}>
                  <Label style={styles.label}>Short bio</Label>
                  <Textarea
                    rowSpan={3}
                    placeholder='* Short Bio'
                    bordered
                    value={bio}
                    onChangeText={text => {
                      setBio(text);
                    }}
                    required
                  />
                </Form>

                <Text style={styles.info}>
                  {' '}
                  Tell us a little about yourself and your pet...
                </Text>
                <Button
                  title='Social Applications'
                  onPress={() => setDisplay(!display)}
                  small
                  style={{marginLeft: 20, marginRight: 20,backgroundColor: 'purple'}}
                >
                  <Text>Optional: Add Social Network Links</Text>
                </Button>
                {socialDisplay}
              </List>
              <Button block style={styles.button} onPress={createProfile}>
                <Text>Edit</Text>
              </Button>
            </LinearGradient>
        
      
    
   
    </ScrollView>
    </KeyboardAvoidingView>
    
   </Container>
   
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: 11,
    paddingTop: 3,
    textAlign: 'left',
    color: 'grey',
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 10
  },
  gallery: {
    backgroundColor: 'white',
    color: 'white',
    marginBottom: 10
  },
  handle: {
    textAlign: 'center',
    marginBottom: 10,
    //marginTop: ,
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
  },
  label: {
    color: 'purple',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3
  },
  thumbnail: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginLeft: 60,
    borderRadius: 100,
    marginBottom: 10
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
    marginTop: 20
  },
  button: {
   padding: 30,
    marginTop: 20,
    backgroundColor: 'purple',
    marginBottom: 50,
  },
  container: {
    textAlign: 'left'
  },
  icon: {
    color: 'purple'
  },
  background: {
    backgroundColor: '#dd72eb',
    borderRadius: 50,
    paddingLeft: 10,
    marginTop: 10,
    paddingRight: 2,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  list: {
    marginLeft: 10
  }
});

Profile.navigationOptions = navData => {


  return {
    headerTitle: 'My Profile',
    headerTintColor: 'purple',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-round-back'
              : 'ios-arrow-round-back'
          }
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={
            Platform.OS === 'android'
              ? 'md-checkmark-circle'
              : 'ios-checkmark-circle'
          }
          onPress={()=>{}}
        />
      </HeaderButtons>
    )
  };
};

export default Profile;
