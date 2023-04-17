import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, Image, View, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from './styles';

//import firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from './firebase/config'

//import drawer nav
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//init Drawer Nav
const Drawer = createDrawerNavigator();

//import Data
import RFavorites from './components/RFavorites'
import RSearch from './components/RSearch'


//Initialize firebase and constants
initializeApp(firebaseConfig)
const dbRef = ref(getDatabase());

//test data
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
    "profile pic": 'https://images.squarespace-cdn.com/content/v1/5ae66c1fe74940380c17d72f/1525060507640-0VO0XMTXBFK83X12CA5H/IMG_20180423_214604%281%29.jpg?format=2500w',
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
      },
      {
        rating: 10,
      }
    ],
    cuisine: ['American'],
    price: '$',
    address: '206 West Franklin Street',
    "profile pic": 'https://static.spotapps.co/web/mightaswellbarandgrill--com/custom/chapel_hill_img_new.jpg',
  },
]


export default function App() {

  //Initialize state
  const [dbState, setDbState] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtainDb = async () => {
    await get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          let db = snapshot.val();
          setDbState(db);
          console.log(db)
        } else {
          return {message: 'No data'};
        }
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
          setLoading(false);
      });
    }
    obtainDb();
  }, []);

  return(
    loading ? <View style={styles.container}><Text>Loading...</Text></View> :

      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Search">
          <Drawer.Screen name="Favorites" component={() => <RFavorites dbState={dbState} setDbState={setDbState} var1={var1}/>} />
          <Drawer.Screen name="Search" component={() => <RSearch dbState={dbState} setDbState={setDbState}/>} />
        </Drawer.Navigator>
      </NavigationContainer>

    //<RSearch dbState={dbState} setDbState={setDbState}/>
  )
}