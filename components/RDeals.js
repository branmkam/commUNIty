import { TextInput, Text, Image, View, TouchableOpacity, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import DealsCard from './DealsCard';
import { parseISOString } from '../App';
import RProfile from './RProfile';
import { get, child, set, ref, getDatabase } from 'firebase/database'
import Toggle from './Toggle';


export default function RDeals(props) {

    const [profile, setProfile] = useState(null)
    const [dbState, setDbState] = useState({})
    const [deals, setDeals] = useState([])

    const { auth, r, setR } = props;
  
    let today = new Date();
    //get all deals
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/')).then((snapshot) => {
      if (snapshot.exists()) {
          setDbState(snapshot.val());
          //add ids
          let deals2 = dbState.restaurants;
          for(const key of Object.keys(deals2).values())
          {
            if(deals2[key].deals != undefined)
            {
              for(const deal in deals2[key].deals)
              {
                  deals2[key].deals[deal]['id'] = key;
              } 
            }
          }

          let deals3 = Object.values(deals2).map(x => x.deals).flat().filter(x => x != undefined);

          //sort by ascending time - return first few after current end date
          setDeals(deals3.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start)));
      }
    });

    return(

      (profile != null ? 
      <View>
           <Button onPress={() => {
          setProfile(null);
          }
        }
          title="Back" />
        <RProfile info={profile} auth={auth}/>
        </View>
        :
        deals.length == 0 ?  
        <View style={styles.container}>
          <Toggle r={r} setR={setR}/>
           <Text>No deals - come back later!</Text>

        </View>
        : <View style={styles.container}>
            <Toggle r={r} setR={setR}/>
             <FlatList style={{flex: 1}}
          data={deals.slice(0, 9)}
          renderItem={({item}) => 
          <Pressable onPress={() => {
            setProfile(dbState.restaurants[item.id]);
          }}>
            <DealsCard deal={item}/>
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>    
      )   
    );
}