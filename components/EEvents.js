import { TextInput, Text, Image, View, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import EventsCard from './EventsCard';
import { parseISOString } from '../App';
import { get, child, set, ref, getDatabase } from 'firebase/database'
import Toggle from './Toggle';

export default function EEvents(props) {
    let { auth, r, setR } = props;
    const [dbState, setDbState] = useState({})
    const [events, setEvents] = useState([])
    let today = new Date();

    //get all events
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/')).then((snapshot) => {
      if (snapshot.exists()) {
          setDbState(snapshot.val());
          console.log(dbState)
          //add ids
          let events2 = dbState.entertainment;
          for(const key of Object.keys(events2).values())
          {
            if(events2[key].events != undefined)
            {
              for(const event in events2[key].events)
              {
                  events2[key].events[event]['id'] = key;
              } 
            }
          }

          let events3 = Object.values(events2).map(x => x.events).flat().filter(x => x != undefined);

          //sort by ascending time - return first few after current end date
          setEvents(events3.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start)));
      }
    });
  
    return(
        events.length == 0 ?  
        <View style={styles.container}>
            <Toggle r={r} setR={setR}/>
            <Text>No events - come back later!</Text>
        </View>
        : <View style={styles.container}>
              <Toggle r={r} setR={setR}/>
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