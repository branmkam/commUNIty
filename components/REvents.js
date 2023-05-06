import { TextInput, Text, Image, View, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import EventsCard from './EventsCard';
import { parseISOString } from '../App';

export default function REvents(props) {
    let { auth, dbState } = props;
    let today = new Date(2022, 1, 1); // new Date();
    //get all events
    
    let events = Object.values(dbState.restaurants).map(x => x.events).flat().filter(x => x != undefined);
    
    //sort by ascending time - return first few after current end date
    events = events.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start));

    return(
        events.length == 0 ?  
        <View style={styles.container}>
            <Text>No events - come back later!</Text>
        </View>
        : <View style={styles.container}>
             <FlatList style={{flex: 1}}
          data={events.slice(0, 9)}
          renderItem={({item}) => 
          <Pressable>
            <EventsCard event={item}/>
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>       
    );
}