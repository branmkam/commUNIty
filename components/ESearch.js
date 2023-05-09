import { TextInput, Text, Image, View, FlatList, Pressable, Button as B } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RProfile from './RProfile';
import { ButtonGroup } from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Row from 'react-bootstrap/Row'
import { get, child, set, ref, getDatabase } from 'firebase/database'
import Toggle from './Toggle';

export default function ESearch(props) {

  const [query, setQuery] = useState(false);
  const [profile, setProfile] = useState(null);
  const [selectedRs, setSelectedRs] = useState([]);
  const [clubsColor, setCColor]=useState(false);
  const [barsColor, setBColor]=useState(false);
  const [liveMusColor, setLMColor]=useState(false);
  const [theatersColor, setTColor]=useState(false);
  const [cinemaColor, setCinColor]=useState(false);
  const [otherColor, setOColor]=useState(false);
  const[cheap, setCheap]=useState(false);
  const[lowerEnd, setLowerEnd]=useState(false);
  const[higherEnd, setHigehrEnd]=useState(false);
  const[expensive, setExpensive]=useState(false);

  const [dbState, setDbState] = useState({});

  const dbRef = ref(getDatabase());
  // getdbstate
  get(child(dbRef, '/')).then((snapshot) => {
      if (snapshot.exists()) {
        setDbState(snapshot.val());
      }
  });

  const Venues = ['Clubs', 'Bars', 'Live Music', 'Theaters', 'Cinema', 'Other']
  const prices = ['$', '$$', '$$$', '$$$$']
  const { auth, r, setR} = props;
  let selectedVenue = [];
  let selectedPrices = [];
  const handleClickClubs = () => {
    setCColor(!clubsColor);
  };
  const handleClickBars = () => {
    setBColor(!barsColor);
  };
  const handleClickLiveMusic = () => {
    setLMColor(!liveMusColor);
  };
  const handleClickTheaters = () => {
    setTColor(!theatersColor);
  };
  const handleClickCinema = () => {
    setCinColor(!cinemaColor);
  };
  const handleClickOther = () => {
    setOColor(!otherColor);
  };
  const handleClickCheap = () => {
    setCheap(!cheap);
  };
  const handleClickLowerEnd = () => {
    setLowerEnd(!lowerEnd);
  };
  const handleClickHigherEnd = () => {
    setHigehrEnd(!higherEnd);
  };
  const handleClickExpensive = () => {
    setExpensive(!expensive);
  };



  return (query ?
    //profile page
    (profile ?
      <View style={styles.container}>
        <B onPress={() => {
          setProfile(null);
        }
        }
          title="Back" />
        <RProfile info={profile} auth={auth} nav={navigation}/>
      </View>
      :
      //results
      <View style={styles.container}>
        <B onPress={() => {
          setQuery(false);
        }
        }
          title="Back" />
        <FlatList style={{ flex: 1 }}
          data={selectedRs}
          renderItem={({ item }) =>
            //click view
            <Pressable style={styles.card} onPress={() => {
              setProfile(item);
            }
            }>
              <View style={styles.imgs}>
                <Image source={{ uri: item.photos.profile }}
                  style={{ borderRadius: 10, width: 130, height: 130 }} />
              </View>
              <View style={styles.info}>
                <Image source={require('../images/favestar.png')}
                  style={styles.faveStar} />
                <Text style={styles.businessTitle}>{item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}</Text>
                <Text>{item.address.length > 30 ? item.address.substring(0, 30) + '...' : item.address}</Text>
                <Text>{item.cuisine}</Text>
                <Text>{item.price}</Text>
                <Text style={styles.businessRating}>
                {item.reviews ? Math.round(Object.values(item.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0) * 10 / Object.values(item.reviews).length) / 10 : 'NA'}/10 ({item.reviews ? Object.values(item.reviews).length : '0'})</Text>
              </View>
            </Pressable>
          }
          keyExtractor={item => item.id}
        />
      </View>) :
    
    //search     
      <View style={styles.container}>
         <Toggle r={r} setR={setR}/>
        <TextInput
          placeholder = "Search entertainment..." style={styles.input}
        />
        <div>
        <Text style={{fontSize: 25}}>Venue Type</Text>{'  '}
        {/* cuisines */ }
        <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#" >
  Clear All
</a>

</div>
    <View>
      <div className='mt-1'>
      <style type="text/css">
        {`
    .off{
      background-color: #F1F1F1;
      color: gray;
    }
    .on {
      background-color: #71C2EC;
      color: white;
    }
    `}
      </style>

        {/* <Button type = "button" onClick{...handleClick} className="on" variant={color ? "active":"rest"} >Italian</Button>{'  '} */}
        {clubsColor ? <Button type = "button" className= "on" onClick = {handleClickClubs}>Clubs</Button> : <Button type = "button"  className="off" onClick = {handleClickClubs} >Clubs</Button>}
        {barsColor ? <Button type = "button"  className= "on" onClick = {handleClickBars}>Bars</Button> : <Button type = "button"  className="off" onClick = {handleClickBars} >Bars</Button>}
        {liveMusColor ? <Button type = "button"  className= "on" onClick = {handleClickLiveMusic}>Live Music</Button> : <Button type = "button"  className="off" onClick = {handleClickLiveMusic} >Live Music</Button>}
       </div>

       <div className='mt-1'>
       {theatersColor ? <Button type = "button"  className= "on" onClick = {handleClickTheaters}>Theaters</Button> : <Button type = "button"  className="off" onClick = {handleClickTheaters} >Theaters</Button>}
       {cinemaColor? <Button type = "button"  className= "on" onClick = {handleClickCinema}>Cinema</Button> : <Button type = "button"  className="off" onClick = {handleClickCinema} >Cinema</Button>}
       {otherColor ? <Button type = "button"  className= "on" onClick = {handleClickOther}>Other</Button> : <Button type = "button"  className="off" onClick = {handleClickOther} >Other</Button>}
       </div>

    {/* <FlatList style={{ flex: 1 }}
      data={cuisines}
      renderItem={({ item }) =>
        <Button type="button" class="btn btn-info" style={styles.unselectedButton} onPress={() => {
          if (selectedCuisines.includes(item)) { //subtract
            selectedCuisines.splice(selectedCuisines.indexOf(item), 1);
          }
          else { //add
            selectedCuisines.push(item);
          }
          console.log(selectedCuisines);
        }} title={item} />
      }
    /> */}
    <br></br>
    <Text style={{fontSize: 25, textAlign:"center"}}>Price Range</Text>
    <br></br>

    
  </View>
  
   {/* prices */ }
        <View >
        <div className='mt-1'>
      <style type="text/css">
       
      </style>
      {cheap ? <Button type = "button" className= "on" onClick = {handleClickCheap}>$</Button> : <Button type = "button"  className="off" onClick = {handleClickCheap} >$</Button>}
      {lowerEnd ? <Button type = "button"  className= "on" onClick = {handleClickLowerEnd}>$$</Button> : <Button type = "button"  className="off" onClick = {handleClickLowerEnd} >$$</Button>}
      {higherEnd ? <Button type = "button"  className= "on" onClick = {handleClickHigherEnd}>$$$</Button> : <Button type = "button"  className="off" onClick = {handleClickHigherEnd} >$$$</Button>}
      {expensive ? <Button type = "button"  className= "on" onClick = {handleClickExpensive}>$$$$</Button> : <Button type = "button"  className="off" onClick = {handleClickExpensive} >$$$$</Button>}
      </div>
          {/* <FlatList style={{flex: 1}}
            data={prices}
            renderItem={({item}) => 
            <Button style={styles.unselectedButton} onPress={() => {
              if(selectedPrices.includes(item)) { //subtract
                selectedPrices.splice(selectedPrices.indexOf(item), 1);
              } 
              else { //add
                selectedPrices.push(item);
              }
              console.log(selectedPrices);
            }} title={item}/>
          } */}
          
          
        </View>

        <B onPress={() => {
          //filter logic for search
          if (selectedVenue.length > 0) {
            if (selectedPrices.length > 0) {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price) && selectedCuisines.includes(r.cuisine)));
            }
            else {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedCuisines.includes(r.cuisine)));
            }
          }
          else {
            if (selectedPrices.length > 0) {
              setSelectedRs(Object.values(dbState.restaurants)
              .filter(r => selectedPrices.includes(r.price)));
            }
            else {
              setSelectedRs(Object.values(dbState.restaurants));
            }
          }
          setQuery(true);
        }} title='Apply' color="#4455ee"/>
      </View >
    )
}