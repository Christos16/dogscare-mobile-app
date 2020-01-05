import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getBooking, getUserData } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { Item } from 'native-base';
import HistoryCard from '../../components/Card/HistoryCard';
import HeaderButton from '../../components/layouts/HeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false
    };
  }

  componentDidMount() {
    this.setState({ isRefreching: true });
    this.props.getUserData(this.props.token);

    this.props.getBooking(this.props.token, this.props.user.handle);
    this.setState({ isRefreching: false });
  }

  render() {
    const { bookings } = this.props;

    let BookingHistory;

    if (bookings.length === 0) {
      BookingHistory = (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 500
          }}
        >
          <ActivityIndicator size='large' color='purple' />
        </View>
      );
    } else {
      BookingHistory = (
        <FlatList
          //  onRefresh={this.props.getBooking}
          //  refreshing={this.state.isRefreching}
          data={bookings}
          keyExtractor={item => item.sitterId}
          renderItem={itemData => (
            <HistoryCard
              pricing={itemData.item.pricing}
              services={itemData.item.services}
              sitterHandle={itemData.item.sitterHandle}
              from={itemData.item.from}
              to={itemData.item.to}
              createAt={itemData.item.createAt}
              comment={itemData.item.comment}
              sitterImage={itemData.item.imgUrl}
            />
          )}
        />
      );
    }
    return <View>{BookingHistory}</View>;
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  bookings: state.auth.bookings
});

History.navigationOptions = navData => {
  return {
    headerTitle: 'Booking History',
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
    )
  };
};

export default connect(
  mapStateToProps,
  { getBooking, getUserData }
)(History);
