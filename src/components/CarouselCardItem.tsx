import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);

const CarouselCardItem = ({ item, index }: { item: any; index: number }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item.brandName}</Text>
    </View>
  );
};

export default CarouselCardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 100,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
});
