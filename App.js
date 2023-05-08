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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";

//import Data
import RFavorites from './components/RFavorites'
import RSearch from './components/RSearch'
import Login from './components/Login';
import Signup from './components/signup';
import RDeals from './components/RDeals';
import REvents from './components/REvents';
import EFavorites from './components/EFavorites';
import EDeals from './components/EDeals';
import EEvents from './components/EEvents';
import ESearch from './components/ESearch';

//Initialize firebase and constants
initializeApp(firebaseConfig)

export default function App() {

  //init Drawer Nav
  const Drawer = createDrawerNavigator();

  //init firebase connections
  const dbRef = ref(getDatabase());
  const auth = getAuth();

  //Initialize state
  const [dbState, setDbState] = useState({})
  const [loading, setLoading] = useState(true)
  const [r, setR] = useState(true);

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

  // auth.currentUser.uid
  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Deals">
        <Drawer.Screen name="Favorites" component={() => r ? <RFavorites auth={auth} r={r} setR={setR}/> : <EFavorites auth={auth} r={r} setR={setR}/>  } />
        <Drawer.Screen name="Search" component={() => r ? <RSearch auth={auth} r={r} setR={setR}/> : <ESearch auth={auth} r={r} setR={setR}/>  } />
        <Drawer.Screen name="Deals" component={() => r ? <RDeals auth={auth} r={r} setR={setR}/> : <EDeals auth={auth} r={r} setR={setR}/>  } />
        <Drawer.Screen name="Events" component={() => r ? <REvents auth={auth} r={r} setR={setR}/> : <EEvents auth={auth} r={r} setR={setR}/>  } />
        <Drawer.Screen name="Login" component={() => <Login auth={auth} />}/>
        <Drawer.Screen name="Signup" component={() => <Signup auth={auth} />}/>
      </Drawer.Navigator>
    </NavigationContainer> 
    )
} 

export function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}