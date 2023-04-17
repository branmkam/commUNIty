import { TextInput, StyleSheet, Text, Image, View, FlatList, Button } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';


//also include review module in here at some point
export default function RProfile(props) {
    const { info } = props;
    return( 
        <View style={styles.container}>
            <Text>{info.name}</Text>
            <Image source={{uri: info.photos.profile}} style={{borderRadius: 10, width: 130, height: 130}} />
            <Text>{Object.values(info.reviews).length > 0 ? Math.round(Object.values(info.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(info.reviews).length)/10 : 'NA'}/10 ({Object.values(info.reviews).length})</Text>
            <Text>{info.hours}</Text>
        </View>
    )
}