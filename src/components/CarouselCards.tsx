import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { Platform, Text } from 'react-native';

// Import getBrands function from the data module
import { getBrands } from '../data';

const { width: screenWidth } = Dimensions.get('window');

const CarouselCards = ({ setSelectedBrand }: { setSelectedBrand: any }) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [brands, setBrands] = useState<{ brandName: string }[]>([]);

  // Fetch brands data when the component mounts
  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrandsData();
  }, []);

  const _renderItem = (
    { item, index }: { item: any; index: number },
    parallaxProps: any
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: 'https://cdn4.beautinow.com/wp-content/uploads/2023/08/Most_Popular_Perfumes_0366584622ac4f4fa1abe0c937308f44.pngv=1691390378',
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.overlay} />
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
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    borderRadius: 10,
  },
});
