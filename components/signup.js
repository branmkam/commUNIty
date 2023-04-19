import { TextInput, Text, Image, View, FlatList, Button,StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';

//import firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from './firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function signup(props) {
initializeApp(firebaseConfig)
const dbRef = ref(getDatabase());

const auth = getAuth();


const [userEmail, setUserEmail] = useState('Enter Your Email');
const [userName, setUserName] = useState('Enter Your Username');
const [userPassword, setUserPassword] = useState('Enter Your Password');


// firebase.auth().createUserWithEmailAndPassword(auth, userEmail,userName, userPassword).then((userCredential)=>{
//     // if (userCredential){
//     //    userCredential.updateEmail({
//     //         email: userEmail,
//     const user = userCredential.user

//         }).then((s)=> {
//             this.props.navigation.navigate('Homepage');
//         })
// }
// }).catch(function(error){
//     alert(error.message);
// });
const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail,userName, userPassword);
    } catch (e) {
      setError('There was a problem creating your account');
    }
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
              onChangeText={(email) => setEmail(setUserEmail)}
            /> 
          </View> 
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(username) => setPassword(setUserName)}
            /> 
          </View> 
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(setUserPassword)}
            /> 
          </View> 
          <TouchableOpacity style={styles.submitBtn} onPress={createAccount} disabled= {!email || !password || !confirmPassword}>
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