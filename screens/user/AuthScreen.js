import React, {useReducer, useCallback, useState, useEffect} from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button ,View, ImageBackground, Image, ActivityIndicator, Alert} from 'react-native';

import Input from '../../components/layouts/Input';
import TempCard from '../../components/Card/TempCard';
import {LinearGradient } from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';

const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if (action.type === REDUCER_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
          
        },
        inputValidities: {
          email:  false,
          password: false
        },
        formIsValid:  false
      });

      useEffect(()=> {
          if(error){
              Alert.alert('An Error Occured!', error, [{text: 'Okay'}])
          }
      }, [error])
    
    const authHandler = async () => {
        let action;
        if (isSignup){
            action = 
          authActions.signUp(formState.inputValues.email, formState.inputValues.password)
        } else {    
            action = authActions.login(formState.inputValues.email, formState.inputValues.password)

        }
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Main');
        } catch(err){
            setError(err.message)
            setIsLoading(false)
        }
     
    
       
    }
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
 return ( 
     <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen} backgroundImage={{}}>
      <LinearGradient colors={['white', 'purple']} style={styles.gradient}>
     <TempCard style={styles.authContainer}>
        <Image style={styles.image} source={require('../../assets/favicon.png')}/>
         <ScrollView>
            <Input id="email" label="E-Mail" keyboardType="email-address" required email autoCapitalize="none" errorText="Please enter a valid email address" onInputChange={inputChangeHandler} initialValue=""/>

            <Input id="password" label="Password" secureTextEntry minLength={4} required email autoCapitalize="none" errorText="Please enter a valid password" onInputChange={inputChangeHandler} initialValue=""/>
            <View style={styles.buttonContainer}>
            {isLoading ? (<ActivityIndicator size="small" color="purple"/>) :( <Button title={isSignup ? 'Sign Up' : 'Login'} color="purple" onPress={authHandler}/>) }
            </View>
            <View style={styles.buttonContainer}>
            <Button title={`Switch to ${isSignup ? 'Login'  : 'Sign Up'}`} color="lightblue" onPress={()=>{setIsSignup(prevState => !prevState)}}/>
            </View>

         </ScrollView>
         </TempCard>
         </LinearGradient>
         </KeyboardAvoidingView>

    

 )   
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,  
    },
    buttonContainer: {
        marginTop: 10
    },
    gradient: {
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
