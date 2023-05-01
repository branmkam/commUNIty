import { TextInput, Text, Image, View, FlatList, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { styles } from '../styles';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RProfile from './RProfile';
import { ButtonGroup } from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'


export default function RSearch(props) {

  const [query, setQuery] = useState(false);
  const [profile, setProfile] = useState(null);
  const [selectedRs, setSelectedRs] = useState([]);
  const [italianColor, setIColor]=useState(false);
  const [chineseColor, setCColor]=useState(false);
  const [frenchColor, setFColor]=useState(false);
  const [spanishColor, setSColor]=useState(false);
  const [mexicanColor, setMColor]=useState(false);
  const [japaneseColor, setJColor]=useState(false);
  const [thaiColor, setTColor]=useState(false);
  const [koreanColor, setKColor]=useState(false);
  const [mediterraneanColor, setMTColor]=useState(false);
  const [americanColor, setAColor]=useState(false);
  const [ethiopianColor, setEColor]=useState(false);
  const [other, setOColor]=useState(false);
  const[cheap, setCheap]=useState(false);
  const[lowerEnd, setLowerEnd]=useState(false);
  const[higherEnd, setHigehrEnd]=useState(false);
  const[expensive, setExpensive]=useState(false);


  const cuisines = ['Italian', 'Chinese', 'French', 'Spanish', 'Mexican', 'Japanese', 'Thai', 'Korean', 'Mediterranean', 'American', 'Ethiopian', 'Other']
  const prices = ['$', '$$', '$$$', '$$$$']
  const { dbState } = props;
  let selectedCuisines = [];
  let selectedPrices = [];
  const handleClickItalian = () => {
    setIColor(!italianColor);
  };
  const handleClickChinese = () => {
    setCColor(!chineseColor);
  };
  const handleClickFrench = () => {
    setFColor(!frenchColor);
  };
  const handleClickSpanish = () => {
    setSColor(!spanishColor);
  };
  const handleClickMexican = () => {
    setMColor(!mexicanColor);
  };
  const handleClickJapanese = () => {
    setJColor(!japaneseColor);
  };
  const handleClickThai = () => {
    setTColor(!thaiColor);
  };
  const handleClickKorean = () => {
    setKColor(!koreanColor);
  };
  const handleClickMediterranean = () => {
    setMTColor(!mediterraneanColor);
  };
  const handleClickAmerican = () => {
    setAColor(!americanColor);
  };
  const handleClickEthiopian = () => {
    setEColor(!ethiopianColor);
  };
  const handleClickOther = () => {
    setOColor(!other);
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
        <Button onPress={() => {
          setProfile(null);
        }
        }
          title="Back" />
        <RProfile info={profile} />
      </View>
      :
      //results
      <View style={styles.container}>
        <Button onPress={() => {
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
                <Text>0.7 miles away</Text>
                <Text>{item.price}</Text>
                <Text style={styles.businessRating}>
                  {Object.values(item.reviews).length > 0 ? Math.round(Object.values(item.reviews).map(r => r.rating).reduce((acc, cv) => acc + cv, 0) * 10 / Object.values(item.reviews).length) / 10 : 'NA'}/10 ({Object.values(item.reviews).length})</Text>
              </View>
            </Pressable>
          }
          keyExtractor={item => item.id}
        />
      </View>) :
    
    //search     
      <View style={styles.container}>
        <TextInput
          placeholder = "Search" style={styles.input}
        />
        <div>
        <Text style={{fontSize: 25}}>Cuisine</Text>{'  '}
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
        {italianColor ? <Button type = "button" className= "on" onClick = {handleClickItalian}>Italian</Button> : <Button type = "button"  className="off" onClick = {handleClickItalian} >Italian</Button>}
        {chineseColor ? <Button type = "button"  className= "on" onClick = {handleClickChinese}>Chinese</Button> : <Button type = "button"  className="off" onClick = {handleClickChinese} >Chinese</Button>}
        {frenchColor ? <Button type = "button"  className= "on" onClick = {handleClickFrench}>French</Button> : <Button type = "button"  className="off" onClick = {handleClickFrench} >French</Button>}
       </div>

       <div className='mt-1'>
       {spanishColor ? <Button type = "button"  className= "on" onClick = {handleClickSpanish}>Spanish</Button> : <Button type = "button"  className="off" onClick = {handleClickSpanish} >Spanish</Button>}
       {mexicanColor? <Button type = "button"  className= "on" onClick = {handleClickMexican}>Mexican</Button> : <Button type = "button"  className="off" onClick = {handleClickMexican} >Mexican</Button>}
       {japaneseColor ? <Button type = "button"  className= "on" onClick = {handleClickJapanese}>Japanese</Button> : <Button type = "button"  className="off" onClick = {handleClickJapanese} >Japanese</Button>}
       </div>
     
       <div className='mt-1'>
       {thaiColor ? <Button type = "button"  className= "on" onClick = {handleClickThai}>Thai</Button> : <Button type = "button"  className="off" onClick = {handleClickThai} >Thai</Button>}
       {koreanColor ? <Button type = "button"  className= "on" onClick = {handleClickKorean}>Korean</Button> : <Button type = "button"  className="off" onClick = {handleClickKorean} >Korean</Button>}
       {mediterraneanColor ? <Button type = "button"  className= "on" onClick = {handleClickMediterranean}>Mediterranean</Button> : <Button type = "button"  className="off" onClick = {handleClickMediterranean} >Mediterranean</Button>}
       </div>

       <div className='mt-1'>
       {americanColor ? <Button type = "button"  className= "on" onClick = {handleClickAmerican}>American</Button> : <Button type = "button"  className="off" onClick = {handleClickAmerican} >American</Button>}
       {ethiopianColor ? <Button type = "button"  className= "on" onClick = {handleClickEthiopian}>Ethiopian</Button> : <Button type = "button"  className="off" onClick = {handleClickEthiopian} >Ethiopian</Button>}
       {other ? <Button type = "button"  className= "on" onClick = {handleClickOther}>Other</Button> : <Button type = "button"  className="off" onClick = {handleClickOther} >Other</Button>}
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
        <View>
        <br></br>
          <Text style={{fontSize: 25}}>Location</Text>
          
        </View>

        <Button onPress={() => {
          //filter logic for search
          if (selectedCuisines.length > 0) {
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