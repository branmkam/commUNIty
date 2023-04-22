import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import DealsCard from './DealsCard';
import EventsCard from './EventsCard';

//also include review module in here at some point
export default function RProfile(props) {
    const { info } = props;
    console.log(info)
    return( 
        <View style={styles.container}>
            <Text>{info.name}</Text>
            <Image source={{uri: info.photos.profile}} style={{borderRadius: 10, width: 130, height: 130}} />
            <Text>{Object.values(info.reviews).length > 0 ? Math.round(Object.values(info.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(info.reviews).length)/10 : 'NA'}/10 ({Object.values(info.reviews).length})</Text>
            <Text>{info.hours}</Text>
            {/* deals */}
            <Text>Deals</Text>
            <FlatList style={{flex: 1}}
          data={info.deals ? info.deals : []}
          renderItem={({item}) => 
          <Pressable onPress = {() => {
              //setProfile(item)
            }
          }
           style={styles.card}>
            <DealsCard deal = {item} />
          </Pressable>
          }
          keyExtractor={item => item.id}
        />

         {/* events */}
         <Text>Events</Text>
            <FlatList style={{flex: 1}}
          data={info.events ? info.events : []}
          renderItem={({item}) => 
          <Pressable onPress = {() => {
              //setProfile(item)
            }
          }
           style={styles.card}>
            <EventsCard event = {item} />
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>
    )
}