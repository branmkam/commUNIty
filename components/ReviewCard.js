import { TextInput, StyleSheet, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import { getDatabase, ref, child, get, set } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.css'
import Card from 'react-bootstrap/Card';

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
        <Card border="secondary" style={{ width: '18rem' }}>
        <Card.Header>{username}</Card.Header>
        <Card.Body>
          <Card.Title>{review.title ? review.title : 'Untitled'}{' '}{review.rating}</Card.Title>
          <Card.Text>
            {review.body}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }