import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';

export default function DealsCard(props) {
    const { deal } = props;
    const startd = Date(deal.start)
    const endd = Date(deal.end)
    console.log(deal.start)
    return(
        
        <View style={styles.card}>
            <Image source={{uri: deal.image}}/>
            <Text>{deal.text}</Text>
            <Text>{/* put dates here */}</Text>
        </View>
    );
}
