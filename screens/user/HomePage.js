import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button ,View, ImageBackground, Image} from 'react-native';

import Input from '../../components/layouts/Input';
import TempCard from '../../components/Card/TempCard'


const AuthScreen = props => {
 return (
    <ImageBackground style ={{width: '100%', height: '100%'}} source={require('../../assets/pet.jpg')}>
    
     <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen} backgroundImage={{}}>
     <View style={styles.authContainer}>
        <Image style={styles.image} source={require('../../assets/favicon.png')}/>
         <ScrollView>
            <Input id="email" label="E-Mail" keyboardType="email-address" required email autoCapitalize="none" errorMessage="Please enter a valid email address" onInputChange={()=>{}} initialValue=""/>
            <Input id="password" label="Password" secureTextEntry minLength={5} required email autoCapitalize="none" errorMessage="Please enter a valid password" onInputChange={()=>{}} initialValue=""/>
            <Button title="Login" color="purple" onPress={()=>{}}/>
            <Button title="Switch to Sign Up" color="lightblue" onPress={()=>{}}/>

         </ScrollView>
         </View>
         </KeyboardAvoidingView>

    
     </ImageBackground>
 )   
}

AuthScreen.navigationOtptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height:80,
        marginBottom: 40,
        marginLeft: 90
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20

    }
});

export default AuthScreen;
