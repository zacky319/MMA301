import { StyleSheet, View } from 'react-native';
import React from 'react';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { brands } from '../data';
import { Dimensions } from 'react-native';
import { Platform, Text } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const CarouselCards = ({ setSelectedBrand }: { setSelectedBrand: any }) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const _renderItem = (
    { item, index }: { item: any; index: number },
    parallaxProps: any
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: 'https://cdn.shopify.com/s/files/1/0655/1181/7473/files/watch_brands_in_Egypt_65a75eb2-60d4-408c-a2c6-94c37855fece_480x480.jpg',
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.brandName}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        ref={isCarousel}
        data={brands}
        renderItem={_renderItem}
        hasParallaxImages={true}
        vertical={false}
        onSnapToItem={(index) => {
          setSelectedBrand(brands[index].brandName);
          setIndex(index);
        }}
      />
      <Pagination
        dotsLength={brands.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 80,
    height: Math.round(screenWidth * 0.4),
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
