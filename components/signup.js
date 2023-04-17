import { TextInput, Text, Image, View, FlatList, Button } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';

//import firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from './firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signUpInput = ()=> {
    const [userEmail, setUserEmail] = useState('Enter Your Email');
    const [userName, setUserName] = useState('Enter Your Username');
    const [userPassword, setUserPassword] = useState('Enter Your Password');
}

export default function signup(props) {
const auth = getAuth();

firebase.auth().createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential)=>{
    if (userCredential){
       userCredential.updateEmail({
            displayName: userEmail
        }).then((s)=> {
            this.props.navigation.navigate('Homepage');
        })
}
}).catch(function(error){
    alert(error.message);
});


const [loading, setLoading] = useState(false);
const [errortext, setErrortext] = useState('');
const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const usernameInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
   //show loader
   setLoading(true);
   var Userdata = {
    name: userName,
    email: userEmail,
    password: userPassword,
   };
}}