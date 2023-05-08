import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {

 const { nav, auth } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInAccount = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
       console.log(userCredential)
       nav.navigate('Deals')
    }).catch((e) => {
      console.log(e.message);
      console.log('There was a problem signing in');
    })
  }


  auth.onAuthStateChanged(() => { 
    console.log('auth changed! user ' + auth.currentUser.displayName)
  })

  return (
    <View style={styles.container}>
       <View>
       <Image style={styles.img} source={require("../images/logo.png")} /> 
       </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.guest_user_button} onPress = {() => {
        if(auth.currentUser) {auth.signOut()} 
        nav.navigate('Deals')
      }}>Guest User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signInAccount} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
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
  img: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#FFFFF",
    borderColor: "#4B9CD3",
    borderStyle: "solid",
    borderWidth: 2,
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
  guest_user_button: {
    color: "#4B9CD3",
    height: 30,
    marginBottom: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 15,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#4B9CD3",

  },
});