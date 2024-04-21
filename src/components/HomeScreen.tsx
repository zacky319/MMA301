import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CarouselCards from './CarouselCards';
import CustomFlatList from './watch/CustomFlatList';
import { Watch, watches } from '../data';
import SearchBar from './SearchBar';
import WatchCard from './watch/WatchCard';
import { getItem, setItem } from '../utils/async-storage';
import { Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const HeaderSection = () => (
  <View style={styles.actionWrapper}>
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={{ marginRight: 'auto' }}
    >
      <View style={styles.action}>
        <FeatherIcon color="#6a99e3" name="menu" size={22} />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
    >
      <View style={styles.action}>
        <FeatherIcon color="#6a99e3" name="bell" size={22} />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
    >
      <View style={styles.action}>
        <FeatherIcon color="#6a99e3" name="user" size={22} />
      </View>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [favoriteWatches, setFavoriteWatches] = useState<Watch[]>([]);
  const [watchList, setWatchList] = useState<Watch[]>([]);

  const onPressWatchCard = (watchId: string) =>
    navigation.push('Detail', {
      watchId,
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

    const updatedFavoriteWatches = favoriteWatches.filter(
      (watch) => watch.id !== item.id
    );
    setFavoriteWatches(updatedFavoriteWatches);
    await setItem('favorite', updatedFavoriteWatches);
  };

  const onSubmitSearch = async (search: string) => {
    console.log('onSubmitSearch', search);
    const searchKey = search.trim().toLocaleLowerCase();
    if (searchKey === '') {
      if (selectedBrand === 'All') setWatchList(watches);
      else
        setWatchList(
          watches.filter((watch) => watch.brandName === selectedBrand)
        );
    } else {
      if (selectedBrand === 'All')
        setWatchList(
          watches.filter((watch) =>
            watch.watchName.toLocaleLowerCase().includes(searchKey)
          )
        );
      else
        setWatchList(
          watches.filter(
            (watch) =>
              watch.watchName.toLocaleLowerCase().includes(searchKey) &&
              watch.brandName === selectedBrand
          )
        );
    }
  };

  useEffect(() => {
    (async () => {
      const searchKey = searchPhrase.trim().toLocaleLowerCase();
      if (searchKey === '') {
        if (selectedBrand === 'All') setWatchList(watches);
        else
          setWatchList(
            watches.filter((watch) => watch.brandName === selectedBrand)
          );
      } else {
        if (selectedBrand === 'All')
          setWatchList(
            watches.filter((watch) =>
              watch.watchName.toLocaleLowerCase().includes(searchKey)
            )
          );
        else
          setWatchList(
            watches.filter(
              (watch) =>
                watch.watchName.toLocaleLowerCase().includes(searchKey) &&
                watch.brandName === selectedBrand
            )
          );
      }
    })();
  }, [selectedBrand]);

  const checkIsFavorite = (itemId: string) => {
    return favoriteWatches.findIndex((watch) => watch.id === itemId) !== -1;
  };

  useEffect(() => {
    (async () => {
      const data = await getItem('favorite');
      console.log(data.length);
      setFavoriteWatches(data);
      setWatchList(watches);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getItem('favorite');
      console.log('Focus on Home', data.length);
      setFavoriteWatches(data);
    });

    return unsubscribe;
  }, [navigation]);

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
        data={watchList}
        style={styles.list}
        renderItem={renderItem}
        StickyElementComponent={
          <View style={styles.sticky}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              onSubmitSearch={onSubmitSearch}
            />
          </View>
        }
        HeaderComponent={
          <View>
            <HeaderSection />
            <Text style={styles.title}>
              <Text> Home</Text>
            </Text>
          </View>
        }
        TopListElementComponent={
          <CarouselCards setSelectedBrand={setSelectedBrand} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 60,
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
    color: '#222',
    marginLeft: 10,
  },
  /** Card */
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
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
  /** Action */
  action: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#e8f0f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
  },
});
