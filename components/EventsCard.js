import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';

export default function EventsCard(props) {
    const { event } = props;
    return(
        <View style={styles.card}>
            <Image source={{uri: event.image}}/>
            <Text>test test + {event.text}</Text>
        </View>
    );
}
