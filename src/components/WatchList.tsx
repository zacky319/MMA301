import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { watches } from '../data';

const WatchList = () => {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <Text style={styles.title}>{item.id} </Text>
        <Text>{item.watchName}</Text>
      </View>
    );
  };

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  return (
    <View>
      <Text>WatchList</Text>
      {watches && (
        <FlatList
          data={watches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={handleEmpty}
        />
      )}
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  title: {},
});
