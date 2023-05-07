import { TextInput, Text, Image, View, FlatList, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, setError } from 'react';
//import { styles } from '../styles';

//import firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


export default function Signup(props) {
initializeApp(firebaseConfig)
const dbRef = ref(getDatabase());

const { auth, nav } = props;

const [userEmail, setUserEmail] = useState('Enter Your Email');
const [userName, setUserName] = useState('Enter Your Username');
const [userPassword, setUserPassword] = useState('Enter Your Password');
const [confirmUserPassword, setConfirmUserPassword] = useState('Enter Your Password');


auth.onAuthStateChanged(() => { 
  console.log('auth changed! user ' + auth.currentUser.displayName)
})


const createAccount = async () => {
      console.log(userEmail, userPassword, userName)
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
         //put user state var update here
         console.log(userCredential)
         updateProfile(auth.currentUser, {displayName : userName})
         //init user data
         set(ref(db, 'users/' + auth.currentUser.uid), {
          faves: ''
        })
        .then(() => {
          console.log('added')
        })
        .catch((error) => {
          console.log('error: ' + error)
        });
         nav.navigate('Deals')
      }).catch((e) => {
        console.log(e.message);
        console.log('There was a problem creating your account');
      })

  };
  
 
// return jxs react
    return(
    //signup page
 
        <View style={styles.container}>
          {/* <Image style={styles.image} source={require("./assets/log2.png")} />  */}
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setUserEmail(email)}
            /> 
          </View> 
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUserName(username)}
            /> 
          </View> 
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setUserPassword(password)}
            /> 
          </View> 
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setConfirmUserPassword(password)}
            /> 
          </View> 
          <TouchableOpacity style={styles.submitBtn} onPress={createAccount} disabled= {!userEmail || !userPassword || (userPassword != confirmUserPassword) }>
             <Text style={styles.loginText}>Submit</Text> 
        </TouchableOpacity> 
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
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFFFF",
    borderColor: "#4B9CD3",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4B9CD3",
  },
});