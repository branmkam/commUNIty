import * as React from 'react';
import { Button, StyleSheet, FlatList, Item, Text, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';

//IMPORTS FROM OTHER CARDS
//import {} from './components'
import { RestaurantCard } from './components/RestaurantCard'

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

const data = [
  {
    id: 1,
    name: '411 West',
    reviews: [
      {
        rating: 8.5
      },
      {
        rating: 10
      }
    ],
    cuisine: ['Italian'],
    price: '$$$',
    address: '411 West Franklin Street',
  },
  {
    id: 2,
    name: 'Might As Well',
    reviews: [
      {
        rating: 7.5
      },
      {
        rating: 9.5
      }
    ],
    cuisine: ['American'],
    price: '$',
    address: '206 West Franklin Street',
  },
]
  
export default function App()
{
  return(
    <View style={styles.container}>
      <Text>test text xd</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <RestaurantCard style={styles.item} props={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});