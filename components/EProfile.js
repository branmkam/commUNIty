import { TextInput, StyleSheet, Modal, Text, Image, View, FlatList, Button, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import DealsCard from './DealsCard';
import EventsCard from './EventsCard';
import ReviewCard from './ReviewCard';
import { useState } from 'react';
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { parseISOString } from '../App';

//also include review module in here at some point
export default function EProfile(props) {

  //toggle favorite entertainment by id
    function toggleFave(arr, toggle) {   
      if(arr == '') {
        return [toggle].join(',')
      }
      else {
        arr = arr.split(',').map(x => parseInt(x))
        console.log(arr, toggle, arr.includes(toggle))
        if(arr.includes(toggle)) {
          arr.splice(arr.indexOf(toggle), 1)
        }
        else {
          arr.push(toggle)
        }
      }
      return arr.filter(x => !Number.isNaN(x)).join(',')
    }
      
    //toggle with database calls
    function toggleFaveRest() {
      get(child(dbRef, 'users/')).then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(db, 'users/' + auth.currentUser.uid), {
            efaves: toggleFave(snapshot.val()[auth.currentUser.uid].efaves, parseInt(info.id))
          })
          .then(() => {
            setFavorited(!favorited)
          })
          .catch((error) => {
            console.log('error: ' + error)
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }


    //database logic for toggling favorite
    const { info, auth } = props;
    
    const db = getDatabase();
    const dbRef = ref(getDatabase());

    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    const [rating, setRating] = useState(null)
    const [favorited, setFavorited] = useState(false)

    //set State based on if favorited already
    let v = false;
    get(child(dbRef, 'users/')).then((snapshot) => {
        if (snapshot.exists()) {
          v = snapshot.val()[auth.currentUser.uid].efaves.split(',').map(x => parseInt(x)).includes(parseInt(info.id))
          setFavorited(v);
        }
      });


    return( 
        <View style={styles.container}>
            <Text>{info.name}</Text>
            {/* Favorite logic*/}
            <Pressable onPress = {() => {
              toggleFaveRest()
            }
            }>
            {auth.currentUser ? <Text>{favorited ? 'Unfavorite' : 'Favorite'}</Text> : ''}
            </Pressable>
            {/* <Image source={require('../images/favestar.png')} style={{height: 50}}/> fix later*/}
            <Image source={{uri: info.photos.profile}} style={{borderRadius: 10, width: 130, height: 130}} />
            <Text>{info.reviews ? Math.round(Object.values(info.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0)*10  / Object.values(info.reviews).length)/10 : 'NA'}/10 ({info.reviews ? Object.values(info.reviews).length : '0'})</Text>
            <Text>{info.hours}</Text>
            
            {/* deals */}
            <Text>Deals</Text>
            <FlatList style={{flex: 1}}
          data={info.deals ?  info.deals.filter(x => parseISOString(x.end) >= new Date(2011, 3, 3)).sort((a, b) => parseISOString(a.start) - parseISOString(b.start)) : []}
          renderItem={({item}) => 
          <Pressable onPress = {() => {
              //setProfile(item)
            }
          }
           style={styles.card}>
            <DealsCard deal = {item} />
          </Pressable>
          }
          keyExtractor={item => item.id}
        />

         {/* events */}
         <Text>Events</Text>
            <FlatList style={{flex: 1}}
          data={info.events ? info.events.filter(x => parseISOString(x.end) >= new Date(2011, 3, 3)).sort((a, b) => parseISOString(a.start) - parseISOString(b.start)) : []}
          renderItem={({item}) => 
          <Pressable onPress = {() => {
              //setProfile(item)
            }
          }
           style={styles.card}>
            <EventsCard event = {item} />
          </Pressable>
          }
          keyExtractor={item => item.id}
        />

        <Text>Reviews</Text>
        <FlatList style={{flex: 1}}
          data={info.reviews ? Object.values(info.reviews)  : []}
          renderItem={({item}) => 
            <ReviewCard review = {item} />
          }
          keyExtractor={item => item.id}
        />
        <Button title={auth.currentUser ? "Add Review" : "Sign in to add review"} onPress={() => {
          auth.currentUser ? setModalVisible(true) : navigation.navigate('Login')
        }}/>

        {/* MODAL FOR WRITING REVIEW*/}
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View>
              <Text>Review {info.name}</Text>
              <TextInput
                placeholder = "Title"
                onChangeText={(txt) => {
                  setTitle(txt);
                }
              }
              />
              <TextInput
                placeholder = "Rating"
                onChangeText={(txt) => {
                  let v = parseFloat(txt)
                  if(v < 0) {
                    setRating(0)
                  }
                  else if(v > 10) {
                    setRating(10)
                  }
                  else
                  {
                    setRating(Math.floor(v*2)/2)
                  }
                }}
              />
              <TextInput
                placeholder = "Body"
                onChangeText={(txt) => {
                    setBody(txt);
                  }
                }
              />
                <Pressable
                  onPress={() => {
                  // update review of entertainment
                  if(body && title && rating) {
                    console.log(rating)
                    let randint = Math.floor(Math.random() * 100000);
                    //check if existing reviews
                    let json = {}
                    get(child(dbRef, 'entertainment/' + info.id + '/reviews')).then((snapshot) => {
                      if (snapshot.exists()) {
                        //get open review number
                        {
                          while(Object.keys(snapshot.val()).includes(randint)) { //ensure random review by entertainment
                            randint = Math.floor(Math.random() * 100000);
                          }
                        }
                        json = snapshot.val();
                        json[randint] = {
                          flag: false,
                          rating: rating,
                          user_id: auth.currentUser.uid,
                          body: body,
                          title: title,
                        } 
                      }
                      else {
                        json[randint] = {
                          flag: false,
                          rating: rating,
                          user_id: auth.currentUser.uid,
                          body: body,
                          title: title,
                        } 
                      }
                      console.log(json[randint])
                      //upload review
                      update(ref(db, 'entertainment/' + info.id), {
                        reviews: json,
                      })
                      .then(() => {
                        console.log('uploaded')
                      })
                      .catch((error) => {
                        console.log('error: ' + error)
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                    setModalVisible(!modalVisible)
                  }
                  else {
                    console.log('fields not complete')
                  }
                }
              }>
                  <Text>Submit Review</Text>
                </Pressable>
                <Pressable onPress={() => {
                  setModalVisible(!modalVisible)
                }}>
                  <Text>Back</Text>
                </Pressable>
            </View>
          </Modal>
        </View>

      </View>
    )
}