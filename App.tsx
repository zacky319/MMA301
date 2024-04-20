import { StyleSheet } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './src/components/HomeScreen';
import FavoriteScreen from './src/components/FavoriteScreen';
import WatchDetail from './src/components/watch/WatchDetail';

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
        name="Home"
        component={HomeScreen}
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
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
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
              return;
            })(route),
          })}
        />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FBDABB',
  },
});
