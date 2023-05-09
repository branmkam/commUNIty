import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { parseISOString } from '../App';

export default function DealsCard(props) {
    const { deal } = props;
    const startd = parseISOString(deal.start);
    const endd = parseISOString(deal.end);
    const start = startd.toLocaleString([], {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    const end = endd.toLocaleString([], {hour: '2-digit', minute: '2-digit'});

    //console.log("../images/" + deal.image)
    return(
    <View style={styles.container}>
        <View style={styles.card}>
            <Image style={styles.img} source={require("../images/quechulaDeal.png")}/>
            <Text>{deal.text}</Text>
            <Text>{' ' + start + '-' + end}</Text>
        </View>
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      },
    img: {
      height: 300,
      width: 300,
      marginBottom: 20,
    },
    text: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    }
  });

