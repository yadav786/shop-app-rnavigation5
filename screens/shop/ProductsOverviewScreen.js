import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts);
    
    return () => {
      unsubscribe();
    }
  }, [loadProducts]);

  useEffect(() => {
    const loadProducts = async() => {
      setLoading(true);
      try {
      await dispatch(productsActions.fetchProducts());
      }
      catch(err){
        setError(err.message);
      }
      setLoading(false);
    }
    loadProducts();
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if(error){
    return(<View style={style.centered}>
      <Text>An error Occured!</Text>
      </View>)
  }

  if(loading){
    return(<View style={style.centered}>
      <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )
  }

  if(!loading && products.length === 0){
    return(<View style={style.centered}>
      <Text>No Products found!</Text>
      </View>)
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const style = StyleSheet.create({
    centered: {flex:1, justifyContent: 'center', alignItems: 'center'}
});

export default ProductsOverviewScreen;
