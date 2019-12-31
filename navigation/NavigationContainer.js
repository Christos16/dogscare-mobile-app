import React, {useEffect, useRef} from 'react';
import MainNavigator from './MainNavigation'
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation'

const NavigationContainer = props => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(()=> {
       if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
        }
    }, [isAuth]);

    return <MainNavigator ref={navRef}/>
}

export default NavigationContainer;