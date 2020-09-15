import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as orderScreenOptions} from '../screens/shop/OrdersScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
      return (
        <ProductsStackNavigator screenOptions={defaultNavOptions}>
          <ProductsStackNavigator.Screen 
            name="ProductsOverview" 
            component={ProductsOverviewScreen}
            options={productsOverviewScreenOptions}
          />
          <ProductsStackNavigator.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={productDetailScreenOptions}
          />
          <ProductsStackNavigator.Screen 
            name="Cart" 
            component={CartScreen}
            options={cartScreenOptions}
          />
        </ProductsStackNavigator>
      )
}

/*
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

*/

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={orderScreenOptions}
      />
    </OrdersStackNavigator>
  )
}

/*
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
*/

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStackNavigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen 
        name="UserProducts" 
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
       <AdminStackNavigator.Screen 
        name="EditProduct" 
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator>
  )
}

/*
const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
*/

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
      <ShopDrawerNavigator screenOptions={defaultNavOptions} 
        drawerContent={props => {
          return (
            <View style={{flex: 1, padding: 20}}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props}/>
              <Button title="Logout" color={Colors.primary} onPress={() => {
                dispatch(authActions.logout());
              }}/>
              </SafeAreaView>
          </View>
          )
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary
        }}
        >
        <ShopDrawerNavigator.Screen
          name="Products" 
          component={ProductsNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen 
          name="Orders" 
          component={OrdersNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen 
          name="Admin" 
          component={AdminNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
      </ShopDrawerNavigator>
  )
}

/*
const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();

      return <View style={{flex: 1, padding: 20}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props}/>
        <Button title="Logout" color={Colors.primary} onPress={() => {
          dispatch(authActions.logout());
        }}/>
        </SafeAreaView>
      </View>
    }
  }
);
*/

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
    return (
      <AuthStackNavigator screenOptions={defaultNavOptions}>
       <AuthStackNavigator.Screen 
        name="Auth" 
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator> 
    )
}

/*
const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
},{
defaultNavigationOptions: defaultNavOptions
}
);
*/

/*
const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator 
});

export default createAppContainer(MainNavigator);
*/
