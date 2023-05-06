import { TextInput, Text, Image, View, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import DealsCard from './DealsCard';
import { parseISOString } from '../App';

export default function RDeals(props) {
    let { auth, dbState } = props;
    let today = new Date(2023, 3, 10); // new Date();
    //get all deals

    let deals = Object.values(dbState.restaurants).map(x => x.deals).flat().filter(x => x != undefined);
    
    //sort by ascending time - return first few after current end date
    deals = deals.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start));

    return(
        deals.length == 0 ?  
        <View style={styles.container}>
            <Text>No deals - come back later!</Text>
        </View>
        : <View style={styles.container}>
             <FlatList style={{flex: 1}}
          data={deals.slice(0, 9)}
          renderItem={({item}) => 
          <Pressable>
            <DealsCard deal={item}/>
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>       
    );
}