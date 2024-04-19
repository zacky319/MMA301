import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CarouselCards from './CarouselCards';
import WatchList from './WatchList';
import CustomFlatList from './CustomFlatList';
import { watches } from '../data';
import SearchBar from './SearchBar';
import FeatherIcon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          // handle onPress
        }}
      >
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image
              alt=""
              resizeMode="cover"
              style={styles.cardImg}
              source={{ uri: item.image }}
            />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.watchName}</Text>

              <Text style={styles.cardPrice}>
                ${item.price.toLocaleString('en-US')}
              </Text>
            </View>

            <View style={styles.cardStats}>
              <View style={styles.cardStatsItem}>
                <FeatherIcon color="#48496c" name="zap" size={14} />

                <Text style={styles.cardStatsItemText}>{item.price} hp</Text>
              </View>

              <View style={styles.cardStatsItem}>
                <FeatherIcon color="#48496c" name="navigation" size={14} />

                <Text style={styles.cardStatsItemText}>
                  {item.price.toLocaleString('en-US')} miles
                </Text>
              </View>

              <View style={styles.cardStatsItem}>
                <FeatherIcon color="#48496c" name="clock" size={14} />

                <Text style={styles.cardStatsItemText}>{item.price} sec</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>{item.price}</Text>

              <Text style={styles.cardFooterText}>
                {item.price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Pressable onPress={() => navigation.navigate('Menu')}>
        <Text>View Menu</Text>
      </Pressable> */}
      {/* <View style={styles.brands}>
        <Text>Brands: </Text>
        <CarouselCards />
      </View>
      <View style={styles.watches}>
        <Text>Watches: </Text>
        <WatchList />
      </View> */}
      <CustomFlatList
        data={watches}
        style={styles.list}
        renderItem={renderItem}
        HeaderComponent={
          <View style={styles.header}>
            <Text>Header</Text>
          </View>
        }
        StickyElementComponent={
          <View style={styles.sticky}>
            <SearchBar
              clicked={clicked}
              setClicked={setClicked}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
            />
          </View>
        }
        TopListElementComponent={
          // <View style={styles.topList}><Text> Top List </Text></View>
          <CarouselCards />
        }
      />
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
  // header: {
  //   flex: 1,
  //   // height: '80%'
  // },
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
  header: {
    borderColor: 'red',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  item: {
    borderColor: 'green',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  list: {
    overflow: 'hidden',
  },
  sticky: {
    // backgroundColor: '#2555FF50',
    // borderColor: 'blue',
    // borderWidth: 5,
    height: 80,
    marginBottom: 6,
    width: '100%',
  },
  topList: {
    borderColor: 'orange',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
});
