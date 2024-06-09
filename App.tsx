import { StyleSheet } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, MaterialIcons, Octicons } from '@expo/vector-icons';

import HomeScreen from './src/components/HomeScreen';
import FavoriteScreen from './src/components/FavoriteScreen';
import WatchDetail from './src/components/perfume/PerfumeDetail';

type RootStackParamList = {
  Home: undefined;
  Detail: { watchId: string };
  Favorite: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={WatchDetail} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={WatchDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            if (route.name === 'Home') {
              if (focused)
                return <FontAwesome6 name="house" size={24} color="black" />;
              else return <Octicons name="home" size={24} color="black" />;
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'favorite' : 'favorite-outline';
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            }
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route);
              if (routeName === 'Detail') {
                return { display: 'none' };
              }
              return;
            })(route),
            headerShown: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route);
              if (routeName === 'Detail') {
                return false;
              }
              return false;
            })(route),
          })}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteStack}
          options={({ route }) => ({
            headerShown: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route);
              if (routeName === 'Detail') {
                return false;
              }
              return false;
            })(route),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
