import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import { parseISOString } from '../App';
import { getDatabase, ref, child, get, set } from "firebase/database";

export default function ReviewCard(props) {

    const { review } = props;
    
    const [username, setUsername] = useState('')

    const db = getDatabase();
    const dbRef = ref(getDatabase());

    get(child(dbRef, 'users/' + review.user_id)).then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        }
      });

    return(
        <View style={styles.card}>
            <Text>{review.title ? review.title : 'Untitled'}</Text>
            <Text>{username} says:</Text>
            <Text>{review.rating}</Text>
            <Text>{review.body}</Text>
        </View>
    );
}
