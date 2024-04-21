import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Rating } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';

import { Watch } from '../../data';

const WatchCard = ({
  item,
  isFavorite,
  onPressWatchCard,
  onPressFavorite,
  onPressUnfavorite,
}: {
  item: Watch;
  isFavorite: boolean;
  onPressWatchCard: (watchId: string) => any;
  onPressFavorite: (item: Watch) => any;
  onPressUnfavorite: (item: Watch) => any;
}) => {
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        onPressWatchCard(item.id);
      }}
      style={styles.card}
    >
      <View>
        <View style={styles.cardTop}>
          <Image
            alt={item.watchName}
            resizeMode="contain"
            style={styles.cardImg}
            source={{ uri: item.image }}
          />
          <TouchableOpacity
            style={styles.favoriteIcon}
            key={item.id}
            onPress={() => {
              isFavorite ? onPressUnfavorite(item) : onPressFavorite(item);
            }}
          >
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-outline'}
              size={35}
              color="pink"
            />
          </TouchableOpacity>
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
      </View>
    </TouchableOpacity>
  );
};

export default WatchCard;

const styles = StyleSheet.create({
  /** Card */
  card: {
    width: '95%',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
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
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    top: 10,
    end: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
});
