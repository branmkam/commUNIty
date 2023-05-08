import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import { parseISOString } from '../App';

export default function DealsCard(props) {
    const { deal } = props;
    const startd = parseISOString(deal.start);
    const endd = parseISOString(deal.end);
    const start = startd.toLocaleString([], {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    const end = endd.toLocaleString([], {hour: '2-digit', minute: '2-digit'});

    return(
        
        <View style={styles.card}>
            <Image source={require("../images/goodfellowsDeals.png")}/>
            <Text>{deal.text}</Text>
            <Text>{' ' + start + '-' + end}</Text>
        </View>
    );
}
