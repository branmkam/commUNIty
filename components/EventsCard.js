import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
//import { styles } from '../styles';
import { useState } from 'react';
import { parseISOString } from '../App';

export default function EventsCard(props) {
    const { event } = props;
    const startd = parseISOString(event.start);
    const endd = parseISOString(event.end);
    const start = startd.toLocaleString([], {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    const end = endd.toLocaleString([], {hour: '2-digit', minute: '2-digit'});

    return(
    <View style={styles.container}>
        <View style={styles.card}>
            <Image source={require("../images/goodfellowsEvent.png")}/>
            <Text>{event.text}</Text>
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
      height: 400,
      width: 400,
      marginBottom: 20,
    },
    text: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    }
  });