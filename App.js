import { StatusBar } from 'expo-status-bar';
import { Pressable, TextInput, StyleSheet, Text, Image, View, FlatList, Button } from 'react-native';
import { useState } from 'react';
import 'react-native-gesture-handler';

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

const cuisines = ['Italian', 'Chinese', 'French', 'Spanish', 'Mexican', 'Japanese', 'Thai', 'Korean', 'Mediterranean', 'American', 'Ethiopian', 'Other']
const prices = ['$', '$$', '$$$', '$$$$']

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
    img: 'https://images.squarespace-cdn.com/content/v1/5ae66c1fe74940380c17d72f/1525060507640-0VO0XMTXBFK83X12CA5H/IMG_20180423_214604%281%29.jpg?format=2500w',
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
    img: 'https://static.spotapps.co/web/mightaswellbarandgrill--com/custom/chapel_hill_img_new.jpg',
  },
]
  

export function RFavorites() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.topbar}>
        <Image style = {{position: 'relative', left: 0, top: 0, height: 80, width: 80, resizeMode: 'contain'}} source={require('./images/logo.png')}/> 
        <Image style = {{position: 'relative', right: 0, top: 0, height: 60, width: 60, resizeMode: 'contain'}} source={require('./images/unclogo.png')}/> 
      </View> */}
      <FlatList style={{flex: 1}}
        data={data}
        renderItem={({item}) => 
        <View style={styles.card}>
          <View style={styles.imgs}>
              <Image source={{uri: item.img}}
              style={{borderRadius: 10, width: 130, height: 130}} />
          </View>
          <View style={styles.info}>
            <Text style={styles.businessTitle}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>0.7 miles away</Text>
            <Text>{item.price}</Text>
            <Text style={styles.businessRating}>{Math.round(item.reviews.map(x => x.rating).reduce(
              (accumulator, currentValue) => accumulator + currentValue, 0) / item.reviews.length * 10) / 10
            }/10 ({item.reviews.length})</Text>
          </View>
        </View>
        }
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export function RSearch() {
  const [selectedCuisines, setSelectedCuisines] = useState([])
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
          <Button onPress={() => {
            if(!selectedCuisines.includes(item)) {
              setSelectedCuisines(selectedCuisines.push(item));
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

export default function App() {
  return(
    RFavorites()
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
    height: 80,
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
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: true,
  },
  unselectedButton: {
    margin: 2,
    backgroundColor: "#ddd",
    border: '2px solid #333',
    borderRadius: 10,
    color: '#333'
  },
  selectedButton: {
    backgroundColor: "#4455ee",
    border: '1px solid #333',
    color: '#fff'
  },
});
