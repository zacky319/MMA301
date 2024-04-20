import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CarouselCards from './CarouselCards';
import CustomFlatList from './watch/CustomFlatList';
import { Watch, watches } from '../data';
import SearchBar from './SearchBar';
import WatchCard from './watch/WatchCard';
import {
  getItem,
  mergeItem,
  removeItem,
  setItem,
} from '../utils/async-storage';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [favoriteWatches, setFavoriteWatches] = useState<Watch[]>([]);

  const onPressWatchCard = (watchId: string) =>
    navigation.navigate('Detail', {
      watchId,
      isFavorite: checkIsFavorite(watchId),
    });

  const onPressFavorite = async (item: Watch) => {
    console.log('onPressFavorite', item.id, favoriteWatches.length);
    if (favoriteWatches.findIndex((watch) => watch.id === item.id) !== -1)
      return;

    setFavoriteWatches([...favoriteWatches, item]);
    await setItem('favorite', [...favoriteWatches, item]);
  };

  const onPressUnfavorite = async (item: Watch) => {
    console.log('onPressUnfavorite', item.id);
    if (favoriteWatches.findIndex((watch) => watch.id === item.id) === -1)
      return;

    setFavoriteWatches(favoriteWatches.filter((watch) => watch.id !== item.id));
    await setItem('favorite', favoriteWatches);
  };

  const checkIsFavorite = (itemId: string) => {
    return favoriteWatches.findIndex((watch) => watch.id === itemId) !== -1;
  };

  useEffect(() => {
    (async () => {
      const data = await getItem('favorite');
      console.log(data.length);
      setFavoriteWatches(data);
    })();
  }, []);

  const renderItem = ({ item }: { item: Watch }) => {
    return (
      <WatchCard
        item={item}
        isFavorite={checkIsFavorite(item.id)}
        onPressWatchCard={onPressWatchCard}
        onPressFavorite={onPressFavorite}
        onPressUnfavorite={onPressUnfavorite}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={watches}
        style={styles.list}
        renderItem={renderItem}
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
        TopListElementComponent={<CarouselCards />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 50,
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
    backgroundColor: 'white',
    height: 80,
    //marginBottom: 6,
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
    width: '80%',
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
