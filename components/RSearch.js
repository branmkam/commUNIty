import { TextInput, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';

import RProfile from './RProfile';

export default function RSearch(props) {

    const [query, setQuery] = useState(false);
    const [profile, setProfile] = useState(null);
    const [selectedRs, setSelectedRs] = useState([]);

    const cuisines = ['Italian', 'Chinese', 'French', 'Spanish', 'Mexican', 'Japanese', 'Thai', 'Korean', 'Mediterranean', 'American', 'Ethiopian', 'Other']
    const prices = ['$', '$$', '$$$', '$$$$']
    const { dbState } = props;
    let selectedCuisines = [];
    let selectedPrices = [];
    
    return(query ? 
    //profile page
    ( profile ? 
        <View style={styles.container}>
          <Button onPress={() => {
              setProfile(null);
            }
          } 
          title="Back" />
          <RProfile info={profile}/>
      </View>
      :
      //results
      <View style={styles.container}>
          <Button onPress={() => {
              setQuery(false);
            }
          } 
          title="Back" />
          <FlatList style={{flex: 1}}
            data={selectedRs}
            renderItem={({item}) => 
            //click view
            <Pressable style={styles.card} onPress = {() => {
                setProfile(item);
              }
            }>
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
                <Text>0.7 miles away</Text>
                <Text>{item.price}</Text>
                <Text style={styles.businessRating}>
                {Object.values(item.reviews).length > 0 ? Math.round(Object.values(item.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(item.reviews).length)/10 : 'NA'}/10 ({Object.values(item.reviews).length})</Text>
              </View>
            </Pressable>
            }
            keyExtractor={item => item.id}
          />
      </View> ) :
    //search
      <View style={styles.container}>
        <TextInput
          style={styles.input}
        />
        <Text style={{fontSize: 16}}>Cuisine</Text>
        {/* cuisines */}
        <View style={styles.buttonsView}>
          <FlatList style={{flex: 1}}
            data={cuisines}
            renderItem={({item}) => 
            <Button style={styles.unselectedButton} onPress={() => {
              if(selectedCuisines.includes(item)) { //subtract
                selectedCuisines.splice(selectedCuisines.indexOf(item), 1);
              } 
              else { //add
                selectedCuisines.push(item);
              }
              console.log(selectedCuisines);
            }} title={item}/>
          }
          />
        </View>
        {/* prices */}
        <View style={styles.buttonsView}>
          <FlatList style={{flex: 1}}
            data={prices}
            renderItem={({item}) => 
            <Button style={styles.unselectedButton} onPress={() => {
              if(selectedPrices.includes(item)) { //subtract
                selectedPrices.splice(selectedPrices.indexOf(item), 1);
              } 
              else { //add
                selectedPrices.push(item);
              }
              console.log(selectedPrices);
            }} title={item}/>
          }
          />
        </View>
        <Button onPress={() => {
          if (selectedCuisines.length > 0) {
            if (selectedPrices.length > 0) {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price) && selectedCuisines.includes(r.cuisine)));
            }
            else {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedCuisines.includes(r.cuisine)));
            }
          }
          else {
            if (selectedPrices.length > 0) {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price)));
            }
            else {
              setSelectedRs(Object.values(dbState.restaurants));
            }
          }
          setQuery(true);
        }} title='Apply' color="#4455ee"/>
      </View>
    )
  }