import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import RProfile from './RProfile';
import { get, child, set, ref, getDatabase } from 'firebase/database'

export default function RFavorites(props) {

    const [profile, setProfile] = useState(null);
    const [dbState, setDbState] = useState({});
    const [faves, setFaves] = useState([]);

    const dbRef = ref(getDatabase());

    const { auth } = props
    //call db
    get(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
          setDbState(snapshot.val());
          if(dbState.users[auth.currentUser.uid]) {
            let rests = dbState.users[auth.currentUser.uid].faves.split(',').map(x => parseInt(x))
            setFaves(rests.map(x => dbState.restaurants[x]))
          }
          else {
            setFaves([])
          }
        }
    });
  
    //define on global scale - pass down as a prop
    return auth.currentUser ? ( profile != null ? 
      <View style={styles.container}>
          <Button onPress={() => {
            setProfile(null);
          }
        } 
        title="Back" />
        <RProfile info={profile} auth={auth}/>
      </View>
      :
      <View style={styles.container}>
        <FlatList style={{flex: 1}}
          data={faves}
          renderItem={({item}) => 
          <Pressable onPress = {() => {
              setProfile(item)
            }
          }
           style={styles.card}>
            <View style={styles.imgs}>
                <Image source={{uri: item.photos.profile}}
                style={{borderRadius: 10, width: 130, height: 130}} />
            </View>
            <View style={styles.info}>
               <Image source={require('../images/favestar.png')}
                style={styles.faveStar} />
              <Text style={styles.businessTitle}>{item.name.length > 20 ? item.name.substring(0,20) + '...' : item.name}</Text>
              <Text>{item.address.length > 30 ? item.address.substring(0,30) + '...' : item.address}</Text>
              <Text>{item.cuisine}</Text>
              <Text>{item.price}</Text>
              <Text style={styles.businessRating}>
              {Object.values(item.reviews).length > 0 ? Math.round(Object.values(item.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(item.reviews).length)/10 : 'NA'}/10 ({Object.values(item.reviews).length})</Text>
            </View>
          </Pressable>
          }
        />
      </View>
    ) : <Text>Sign in to see your favorites!</Text>;
  }