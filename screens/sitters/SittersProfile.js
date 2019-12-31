import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../common/Color';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/layouts/HeaderButton';
import { fetchSitters } from '../../store/actions/sitters';
import CardBase from '../../components/Card/CardBase';




import { Button } from 'native-base';

const SittersProfile = props => {
  const sitters = useSelector(state => state.sitters.sittersProfile);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreching, setIsRefreching] = useState(false);
 

  const sitterCount = sitters.length;

  const getSitters = useCallback(async () => {
    setIsRefreching(true);
    try {
      await dispatch(fetchSitters());
    } catch (err) {
      console.log(err);
    }
    setIsRefreching(false);
  }, [dispatch, setIsLoading]);



  useEffect(() => {
    setIsLoading(true);
    getSitters().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, getSitters]);

  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='purple' />
      </View>
    );
  }

  const selectSitter = (
    id,
    handle,
    image,
    bio,
    services,
    Competence,
    pricing,
    responsibility
  ) => {
    props.navigation.navigate('SitterDetails', {
      sitterId: id,
      sitterHandle: handle,
      image: image,
      Competence: Competence,
      bio: bio,
      services: services,
      pricing: pricing,
      responsibility: responsibility
    });
  };

  return (
    <View>
      <FlatList
        onRefresh={getSitters}
        refreshing={isRefreching}
        data={sitters}
        keyExtractor={item => item.sitterId}
        renderItem={itemData => (
         
          <CardBase
            bio={itemData.item.bio}
            image={itemData.item.image}
            sitterHandle={itemData.item.sitterHandle}
            certified={itemData.item.certified}
            location={itemData.item.location}
            price={itemData.item.pricing}
          >
            <Button
              style={{ backgroundColor: 'purple', padding: 20 }}
              small
              primary
              onPress={() => {
                selectSitter(
                  itemData.item.sitterId,
                  itemData.item.sitterHandle,
                  itemData.item.image,
                  itemData.item.bio,
                  itemData.item.responsibilities,
                  itemData.item.services,
                  itemData.item.responsibility,
                  itemData.item.pricing,
                  itemData.item.Competence
                );
              }}
            >
              <Text style={{ color: 'white' }}>Visit Profile</Text>
            </Button>
          </CardBase>
          
        )}
      />
    </View>
  );
};

SittersProfile.navigationOptions = navData => {
  return {
    headerTitle: 'All available sitters',
    headerTintColor: 'purple',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default SittersProfile;
