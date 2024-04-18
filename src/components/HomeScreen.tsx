import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CarouselCards from './CarouselCards';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Pressable onPress={() => navigation.navigate('Menu')}>
        <Text>View Menu</Text>
      </Pressable> */}
      <View style={styles.brands}>
        <Text>Brands: </Text>
        <CarouselCards />
      </View>
      <View style={styles.watches}>
        <Text>Watches: </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 50,
  },
  header: {
    flex: 1,
    // height: '80%'
  },
  brands: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    //flex: 10
  },
  watches: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 50,
    // flex: 1
  },
});
