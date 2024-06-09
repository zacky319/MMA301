import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-elements';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';

import { getItem, setItem } from '../../utils/asyncStorage';
import { Perfume, getPerfumeDetail } from '../../data';

const PerfumeDetail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [favoritePerfumes, setFavoritePerfumes] = useState<Perfume[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { perfumeId } = route.params;
  const perfume = getPerfumeDetail(perfumeId);

  const onPressFavorite = async (item: Perfume) => {
    console.log('onPressFavorite', item.id, favoritePerfumes.length);
    if (favoritePerfumes.findIndex((perfume) => perfume.id === item.id) !== -1)
      return;

    setFavoritePerfumes([...favoritePerfumes, item]);
    await setItem('favorite', [...favoritePerfumes, item]);
  };

  const onPressUnfavorite = async (item: Perfume) => {
    console.log('onPressUnfavorite', item.id);
    if (favoritePerfumes.findIndex((perfume) => perfume.id === item.id) === -1)
      return;

    const updatedFavoritePerfumes = favoritePerfumes.filter(
      (perfume) => perfume.id !== item.id
    );
    setFavoritePerfumes(updatedFavoritePerfumes);
    await setItem('favorite', updatedFavoritePerfumes);
  };

  const checkIsFavorite = (itemId: string) => {
    return favoritePerfumes.findIndex((perfume) => perfume.id === itemId) !== -1;
  };

  useEffect(() => {
    (async () => {
      const data = await getItem('favorite');
      setFavoritePerfumes(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsFavorite(checkIsFavorite(perfumeId));
    })();
  }, [setFavoritePerfumes, favoritePerfumes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getItem('favorite');
      console.log('Focus on Detail', data.length);
      setFavoritePerfumes(data);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: perfume?.image }}
      />
      <TouchableOpacity
        style={styles.favoriteIcon}
        key={perfume?.id}
        onPress={() => {
          isFavorite ? onPressUnfavorite(perfume) : onPressFavorite(perfume);
        }}
      >
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          size={35}
          color="pink"
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{perfume?.perfumeName}</Text>
        <View style={styles.cardStats}>
          <View>
            <View style={styles.cardStatsItem}>
              <FeatherIcon color="#48496c" name="feather" size={14} />
              <Text style={styles.cardStatsItemText}>{perfume?.brandName}</Text>
            </View>
            {perfume?.isForFemale && (
              <View style={styles.cardStatsItem}>
                <FeatherIcon color="#48496c" name="zap" size={14} />
                <Text style={styles.cardStatsItemText}>Automatic</Text>
              </View>
            )}
            <View style={styles.cardStatsItem}>
              <Rating
                imageSize={20}
                readonly
                fractions="{1}"
                startingValue={perfume?.rating}
              />
              <Text style={styles.cardStatsItemText}>
                ({perfume?.rating.toFixed(1) ?? 0}/5)
              </Text>
              <Text style={styles.cardStatsItemText}>
                {perfume?.feedbacks?.length ?? 0} Reviews
              </Text>
            </View>
          </View>
          <Text style={styles.cardPrice}>
            ${perfume?.price.toLocaleString('en-US')}
          </Text>
        </View>
        <Text style={styles.about}>About</Text>
        <Text style={styles.description}>{perfume?.description}</Text>
        <Text style={styles.feedbacks}>
          Reviews ({perfume?.feedbacks?.length ?? 0})
        </Text>
        <ScrollView contentContainerStyle={styles.container}>
          {perfume?.feedbacks?.map(({ rating, comment, author, date }, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.feedbackCard}>
                  <View>
                    <View style={styles.feedbackCardTitleWrapper}>
                      <Text style={styles.feedbackCardTitle}>{author}</Text>
                      <View style={styles.feedbackCardStatsItem}>
                        <FeatherIcon color="#636a73" name="feather" />
                        <Text style={styles.feedbackCardStatsItemText}>
                          {new Date(date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.feedbackCardStats}>
                      <View style={styles.feedbackCardStatsItem}>
                        <Rating
                          imageSize={20}
                          readonly
                          fractions="{1}"
                          startingValue={rating}
                        />
                      </View>
                    </View>
                    <View style={styles.feedbackCardStatsItem}>
                      <EvilIcons name="comment" size={20} color="black" />
                      <Text style={styles.feedbackCardStatsItemText}>
                        {comment}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PerfumeDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    //height: '50%',
    height: 400,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  about: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbacks: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  shareButton: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  cardPrice: {
    fontSize: 30,
    fontWeight: '700',
    color: 'tomato',
    marginBottom: 20,
  },
  cardStats: {
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12,
  },
  feedbackCardTitleWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatsItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
  // Feedback
  feedbackCard: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  feedbackCardImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  feedbackCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  feedbackCardStats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedbackCardStatsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  feedbackCardStatsItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#636a73',
    marginLeft: 2,
  },
  feedbackCardAction: {
    marginLeft: 'auto',
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
});
