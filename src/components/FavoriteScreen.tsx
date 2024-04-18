import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
  const [text, setText] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const customers = await AsyncStorage.getItem('customers');
        setCustomers(customers === null ? [] : JSON.parse(customers));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('customers', JSON.stringify(customers));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [customers]);

  return (
    <>
      <View>
        <TextInput
          placeholder="Enter your name"
          value={text}
          onChangeText={(data) => {
            setText(data);
          }}
        />
        <Pressable
          onPress={() => {
            setCustomers([...customers, text]);
            setText('');
          }}
        >
          <Text>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCustomers([]);
          }}
        >
          <Text>Clear</Text>
        </Pressable>
      </View>
      <View>
        <Text>Customers: </Text>
        {customers.map((customer) => (
          <Text>{customer}</Text>
        ))}
      </View>
    </>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
