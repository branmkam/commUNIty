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

//import navs
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


//init Drawer Nav
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//import Data
import RFavorites from './components/RFavorites'
import RSearch from './components/RSearch'
import Login from './components/Login';
import Signup from './components/signup';
import RDeals from './components/RDeals';

//Initialize firebase and constants
initializeApp(firebaseConfig)
const dbRef = ref(getDatabase());
const auth = getAuth();

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
    (auth.currentUser != null ?
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Deals">
          <Drawer.Screen name="Favorites" component={() => <RFavorites dbState={dbState} setDbState={setDbState} />} />
          <Drawer.Screen name="Search" component={() => <RSearch dbState={dbState} setDbState={setDbState}/>} />
          <Drawer.Screen name="Deals" component={() => <RDeals dbState={dbState} setDbState={setDbState} />} />
          {/* <Drawer.Screen name="Events" component={() => <REvents dbState={dbState} setDbState={setDbState}/>} /> */}
          <Drawer.Screen name="Login" component={() => <Login auth={auth} dbState={dbState} setDbState={setDbState}/>}/>
          <Drawer.Screen name="Signup" component={() => <Signup auth={auth} dbState={dbState} setDbState={setDbState}/>}/>
        </Drawer.Navigator>
      </NavigationContainer> : 
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={() => <Login auth={auth}/>} />
        <Stack.Screen name="Signup" component={() => <Signup auth={auth}/>} />
      </Stack.Navigator>
    </NavigationContainer>

    )
  )
} 

export function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}


// //test data
// const data = [
//   {
//     id: 1,
//     name: '411 West',
//     reviews: [
//       {
//         rating: 8.5
//       },
//       {
//         rating: 10
//       }
//     ],
//     cuisine: ['Italian'],
//     price: '$$$',
//     address: '411 West Franklin Street',
//     "profile pic": 'https://images.squarespace-cdn.com/content/v1/5ae66c1fe74940380c17d72f/1525060507640-0VO0XMTXBFK83X12CA5H/IMG_20180423_214604%281%29.jpg?format=2500w',
//   },
//   {
//     id: 2,
//     name: 'Might As Well',
//     reviews: [
//       {
//         rating: 7.5
//       },
//       {
//         rating: 9.5
//       },
//       {
//         rating: 10,
//       }
//     ],
//     cuisine: ['American'],
//     price: '$',
//     address: '206 West Franklin Street',
//     "profile pic": 'https://static.spotapps.co/web/mightaswellbarandgrill--com/custom/chapel_hill_img_new.jpg',
//   },
// ]
