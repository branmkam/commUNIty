import { TextInput, Text, Image, View, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import DealsCard from './DealsCard';
import { parseISOString } from '../App';
import RProfile from './RProfile';

export default function RDeals(props) {

    const [profile, setProfile] = useState(null)

    let { auth, dbState } = props;
    let today = new Date(2023, 2, 10); // new Date();
    //get all deals

    //add ids
    let deals2 = dbState.restaurants
    for(const key in deals2)
    {
      if(deals2[key].deals != undefined)
      {
        for(const deal in deals2[key].deals)
        {
            deals2[key].deals[deal]['id'] = key;
        } 
      }
    }

    let deals = deals2.map(x => x.deals).flat().filter(x => x != undefined);

    //sort by ascending time - return first few after current end date
    deals = deals.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start));

    return(
      (profile ? <RProfile info={profile}/>:
        deals.length == 0 ?  
        <View style={styles.container}>
            <Text>No deals - come back later!</Text>
        </View>
        : <View style={styles.container}>
             <FlatList style={{flex: 1}}
          data={deals.slice(0, 9)}
          renderItem={({item}) => 
          <Pressable onPress={setProfile(dbState.restaurants[item.id])}>
            <DealsCard deal={item}/>
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>    
      )   
    );
}