import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import CarouselCards from './CarouselCards';
import CustomFlatList from './perfume/CustomFlatList';
import { Perfume, perfumes } from '../data';
import SearchBar from './SearchBar';
import PerfumeCard from './perfume/PerfumeCard'
import { getItem, setItem } from '../utils/asyncStorage';

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
  const [favoritePerfumees, setFavoritePerfumees] = useState<Perfume[]>([]);
  const [perfumeList, setPerfumeList] = useState<Perfume[]>([]);

  const onPressPerfumeCard = (perfumeId: string) =>
    navigation.push('Detail', {
      perfumeId,
    });

  const onPressFavorite = async (item: Perfume) => {
    console.log('onPressFavorite', item.id, favoritePerfumees.length);
    if (favoritePerfumees.findIndex((perfume) => perfume.id === item.id) !== -1)
      return;

    setFavoritePerfumees([...favoritePerfumees, item]);
    await setItem('favorite', [...favoritePerfumees, item]);
  };

  const onPressUnfavorite = async (item: Perfume) => {
    console.log('onPressUnfavorite', item.id);
    if (favoritePerfumees.findIndex((perfume) => perfume.id === item.id) === -1)
      return;

    const updatedFavoritePerfumees = favoritePerfumees.filter(
      (perfume) => perfume.id !== item.id
    );
    setFavoritePerfumees(updatedFavoritePerfumees);
    await setItem('favorite', updatedFavoritePerfumees);
  };

  const onSubmitSearch = async (search: string) => {
    console.log('onSubmitSearch', search);
    const searchKey = search.trim().toLocaleLowerCase();
    if (searchKey === '') {
      if (selectedBrand === 'All') setPerfumeList(perfumes);
      else
        setPerfumeList(
          perfumes.filter((perfume) => perfume.brandName === selectedBrand)
        );
    } else {
      if (selectedBrand === 'All')
        setPerfumeList(
          perfumes.filter((perfume) =>
            perfume.perfumeName.toLocaleLowerCase().includes(searchKey)
          )
        );
      else
        setPerfumeList(
          perfumes.filter(
            (perfume) =>
              perfume.perfumeName.toLocaleLowerCase().includes(searchKey) &&
              perfume.brandName === selectedBrand
          )
        );
    }
  };

  useEffect(() => {
    (async () => {
      const searchKey = searchPhrase.trim().toLocaleLowerCase();
      if (searchKey === '') {
        if (selectedBrand === 'All') setPerfumeList(perfumes);
        else
          setPerfumeList(
            perfumes.filter((perfume) => perfume.brandName === selectedBrand)
          );
      } else {
        if (selectedBrand === 'All')
          setPerfumeList(
            perfumes.filter((perfume) =>
              perfume.perfumeName.toLocaleLowerCase().includes(searchKey)
            )
          );
        else
          setPerfumeList(
            perfumes.filter(
              (perfume) =>
                perfume.perfumeName.toLocaleLowerCase().includes(searchKey) &&
                perfume.brandName === selectedBrand
            )
          );
      }
    })();
  }, [selectedBrand]);

  const checkIsFavorite = (itemId: string) => {
    return favoritePerfumees.findIndex((perfume) => perfume.id === itemId) !== -1;
  };

  useEffect(() => {
    (async () => {
      const data = await getItem('favorite');
      console.log(data.length);
      setFavoritePerfumees(data);
      setPerfumeList(perfumes);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getItem('favorite');
      console.log('Focus on Home', data.length);
      setFavoritePerfumees(data);
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Perfume }) => {
    return (
      <PerfumeCard
        item={item}
        isFavorite={checkIsFavorite(item.id)}
        onPressPerfumeCard={onPressPerfumeCard}
        onPressFavorite={onPressFavorite}
        onPressUnfavorite={onPressUnfavorite}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={perfumeList}
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
    marginTop: 10,
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
