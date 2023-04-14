import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, Image, View, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';

//import firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from './firebase/config'

//import drawer nav
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

//init Drawer Nav
// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Favorites">
//         <Drawer.Screen name="Favorites" component={RFavorites} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

import RFavorites from './components/RFavorites'

//Initialize firebase and constants
initializeApp(firebaseConfig)
const dbRef = ref(getDatabase());
const cuisines = ['Italian', 'Chinese', 'French', 'Spanish', 'Mexican', 'Japanese', 'Thai', 'Korean', 'Mediterranean', 'American', 'Ethiopian', 'Other']
const prices = ['$', '$$', '$$$', '$$$$']

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
  



export function RSearch(dbState) {
  let selectedCuisines = []
  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
      />
      <Text style={{fontSize: 16}}>Cuisine</Text>
      <View style={styles.buttonsView}>
        <FlatList style={{flex: 1}}
          data={cuisines}
          renderItem={({item}) => 
          <Button style={styles.unselectedButton} onPress={() => {
            if(selectedCuisines.includes(item)) { //subtract
              selectedCuisines.splice(selectedCuisines.indexOf(item), 1)
            } 
            else { //add
              selectedCuisines.push(item);
            }
            console.log(selectedCuisines);
          }} title={item}/>
        }
        />
      </View>
      <Button title="Apply" color="#4455ee"/>
    </View>
  )
}

// function RFavorites(dbState) {
//   let rests = dbState.users.u1.Favs.split(',').map(x => parseInt(x)) //replace with auth
//   let faves = rests.map(x => dbState.restaurants[x])

//   //define on global scale - pass down as a prop
//   return (
//     <View style={styles.container}>
//       <View style={styles.topbar}>
//         <Text style={styles.headerTitle}>Favorites</Text>
//         {/* <Image style = {{position: 'relative', left: 0, top: 0, height: 80, width: 80, resizeMode: 'contain'}} source={require('./images/logo.png')}/> 
//         <Image style = {{position: 'relative', right: 0, top: 0, height: 60, width: 60, resizeMode: 'contain'}} source={require('./images/unclogo.png')}/>  */}
//       </View>
//       <FlatList style={{flex: 1}}
//         data={faves}
//         renderItem={({item}) => 
//         <View style={styles.card}>
//           <View style={styles.imgs}>
//               <Image source={{uri: item.photos.profile}}
//               style={{borderRadius: 10, width: 130, height: 130}} />
//           </View>
//           <View style={styles.info}>
//              <Image source={require('./images/favestar.png')}
//               style={styles.faveStar} />
//             <Text style={styles.businessTitle}>{item.name.length > 20 ? item.name.substring(0,20) + '...' : item.name}</Text>
//             <Text>{item.address.length > 30 ? item.address.substring(0,30) + '...' : item.address}</Text>
//             <Text>{item.cuisine}</Text>
//             <Text>0.7 miles away</Text>
//             <Text>{item.price}</Text>
//             <Text style={styles.businessRating}>
//             {Object.values(item.reviews).length > 0 ? Math.round(Object.values(item.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(item.reviews).length)/10 : 'NA'}/10 ({Object.values(item.reviews).length})</Text>
//           </View>
//         </View>
//         }
//         keyExtractor={item => item.id}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

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
          setLoading(false);
        } else {
          return {message: 'No data'};
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    obtainDb();
  }, []);


  return(
    loading ? <View style={styles.container}><Text>Loading...</Text></View> : RSearch(dbState) //call RFavorites instead of RSearch, using some sort of props potentially? maybe <RFavorites props={dbState}/>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 5, 
  },
  imgs: {
    
  },
  info: {
    padding: 10,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topbar: {
    display: 'inline',
    marginTop: 40,
    height: 40,
  },
  businessRating: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#eee',
    color: '#000',
    borderRadius: 10,
    border: '1px solid #333',
    paddingLeft: 5,
    padding: 1,
    paddingRight: 5,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: true,
  },
  selectorButton: {
    margin: 2,
    backgroundColor: "#ddd",
    border: '2px solid #333',
    borderRadius: 10,
    color: '#333',
    width: '20%'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  faveStar: {
    position: 'absolute',
    right: 0,
    bottom: 30,
    width: 20,
    height: 20,
  }
});

