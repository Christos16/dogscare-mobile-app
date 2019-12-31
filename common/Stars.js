import React from 'react';
import { StyleSheet, View } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Ratings = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Stars
        default={2.5}
        count={5}
        half={true}
        starSize={50}
        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
        emptyStar={
          <Icon
            name={'star-outline'}
            style={[styles.myStarStyle, styles.myEmptyStarStyle]}
          />
        }
        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  myEmptyStarStyle: {
    color: 'white'
  }
});

export default Ratings;
