import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon, Button, Thumbnail, Item } from 'native-base';
import DrawerItems from './DefaultDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { connect } from 'react-redux';

class CustomDrawerContentComponent extends Component {
  render() {
    const { user } = this.props;
    //  const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={{ backgroundColor: 'purple', height: 150 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail
                  source={{ uri: user.imageUrl }}
                  rounded
                  name='person'
                  style={styles.thumbnail}
                />
                <Text style={styles.handle}>{`Hi ${user.handle}`} </Text>
              </View>
            </View>

            <DrawerItems {...this.props} />

            <View>
              <View style={{ marginTop: '2%' }}>
                <Text></Text>
              </View>
              <View style={{ marginTop: '3%' }}></View>
              <View style={{ marginTop: '5%' }}></View>
            </View>
          </SafeAreaView>
        </ScrollView>

        <View elevation={6} style={styles.view}>
          <TouchableHighlight>
            <Item>
              <Button onPress={this.props.logout} style={styles.button} rounded>
                <Icon name='log-out' size={20} color='purple' />
                <Text style={styles.text}>Logout</Text>
              </Button>
            </Item>
          </TouchableHighlight>

          <TouchableHighlight>
            <Item>
              <Button
                onPress={() => {
                  logout();
                }}
                style={styles.button}
                rounded
              >
                <Icon name='alert' size={20} color='purple' />
                <Text style={styles.text}>Terms of Use/Privacy Policy</Text>
              </Button>
            </Item>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  handle: {
    color: '#f9f9f9',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 30
  },
  thumbnail: {
    marginBottom: 10,
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  button: {
    backgroundColor: 'purple',
    paddingRight: 20,
    marginBottom: 2
  },
  text: {
    color: 'white'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(CustomDrawerContentComponent);
