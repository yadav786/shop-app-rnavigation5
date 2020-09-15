import React from 'react';
import { useSelector } from 'react-redux';
import { ShopNavigator, AuthNavigator  } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);
    
    return (
        <NavigationContainer>
            { didTryAutoLogin && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;
