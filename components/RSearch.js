import { TextInput, Text, Image, View, FlatList, Button } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';

export default function RSearch(props) {
    const cuisines = ['Italian', 'Chinese', 'French', 'Spanish', 'Mexican', 'Japanese', 'Thai', 'Korean', 'Mediterranean', 'American', 'Ethiopian', 'Other']
    const prices = ['$', '$$', '$$$', '$$$$']
    const { dbState, setDbState } = props;
    let selectedCuisines = [];
    let selectedPrices = [];
    let selectedRs = [];
    
    return(
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
              selectedRs = Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price) && selectedCuisines.includes(r.cuisine));
            }
            else {
              selectedRs = Object.values(dbState.restaurants)
              .filter(r => selectedCuisines.includes(r.cuisine));
            }
          }
          else {
            if (selectedPrices.length > 0) {
              selectedRs = Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price));
            }
            else {
              selectedRs = Object.values(dbState.restaurants);
            }
          }
          console.log(selectedRs.map(x => x.name));
        }} title='Apply' color="#4455ee"/>
      </View>
    )
  }