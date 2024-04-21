import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Watch } from '../data';
import { Rating } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getItem, setItem } from '../utils/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { HeaderSection } from './HomeScreen';

type ItemProps = {
  item: Watch;
  isActive: boolean;
  onPressWatchCard: (index: string) => any;
  onPressCheckbox: (index: string) => any;
};

const Item = ({
  item,
  isActive,
  onPressWatchCard,
  onPressCheckbox,
}: ItemProps) => {
  return (
    <View style={[styles.cardWrapper, isActive && styles.cardActive]}>
      <View style={{ alignSelf: 'center' }}>
        <CheckBox checked={isActive} onPress={() => onPressCheckbox(item.id)} />
      </View>
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          onPressWatchCard(item.id);
        }}
        style={[styles.card]}
      >
        <View style={styles.cardTop}>
          <Image
            alt={item.watchName}
            resizeMode="contain"
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
              <FeatherIcon color="#48496c" name="watch" size={14} />
              <Text style={styles.cardStatsItemText}>{item.brandName}</Text>
            </View>
            {item.automatic && (
              <View style={styles.cardStatsItem}>
                <FeatherIcon color="#48496c" name="zap" size={14} />
                <Text style={styles.cardStatsItemText}>Automatic</Text>
              </View>
            )}
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{''}</Text>

            <Rating
              imageSize={20}
              readonly
              fractions="{1}"
              startingValue={item.rating}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function FavoriteScreen({ navigation }: { navigation: any }) {
  const [favoriteWatches, setFavoriteWatches] = useState<Watch[]>([]);
  const [selectedWatchIds, setSelectedWatchIds] = useState<string[]>([]);

  const checkIsActive = (itemId: string) => {
    return selectedWatchIds.findIndex((watchId) => watchId === itemId) !== -1;
  };

  const onPressWatchCard = (watchId: string) =>
    navigation.navigate('Detail', {
      watchId,
    });

  const onPressDelete = async () => {
    console.log('Click Delete button');

    const updatedFavoriteWatches = favoriteWatches.filter(
      (watch) => !selectedWatchIds.includes(watch.id)
    );
    setFavoriteWatches(updatedFavoriteWatches);
    setSelectedWatchIds([]);
    await setItem('favorite', updatedFavoriteWatches);
  };

  const onPressCheckbox = (itemId: string) => {
    console.log('Click Favorite card', itemId);
    if (selectedWatchIds.includes(itemId)) {
      setSelectedWatchIds(
        selectedWatchIds.filter((watchId) => watchId !== itemId)
      );
    } else {
      setSelectedWatchIds([...selectedWatchIds, itemId]);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getItem('favorite');
      console.log(data.length);
      setFavoriteWatches(data);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setSelectedWatchIds([]);
      const data = await getItem('favorite');
      console.log('Focus on Favorite', data.length);
      setFavoriteWatches(data);
    });

    return unsubscribe;
  }, [navigation]);

  const EmptyComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.titleStyle}>
          Oops! There's no favorite watch here!
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fafafa', paddingTop: 60 }}
    >
      <HeaderSection />
      <Text style={styles.title}>
        <MaterialIcons name="favorite-outline" size={24} color="black" />
        <Text> Favorite ({favoriteWatches.length})</Text>
      </Text>
      {favoriteWatches.length > 0 && (
        <View style={styles.search}>
          <Text style={styles.searchInput}>
            {selectedWatchIds.length} selected
          </Text>

          {selectedWatchIds.length > 0 && (
            <TouchableOpacity onPress={onPressDelete}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Delete</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      <FlatList
        style={styles.container}
        data={favoriteWatches}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            isActive={checkIsActive(item.id)}
            onPressWatchCard={onPressWatchCard}
            onPressCheckbox={onPressCheckbox}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 25,
  },
  titleStyle: {
    paddingTop: '50%',
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
  },
  title: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginHorizontal: 12,
  },
  /** Card */
  card: {
    width: '80%',
    borderColor: 'transparent',
    borderRadius: 12,
    backgroundColor: '#fff',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 2,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  cardActive: {
    borderColor: '#0069fe',
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 130,
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
    color: 'tomato',
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
  /** Search */
  search: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
    marginLeft: 12,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: '#222',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
