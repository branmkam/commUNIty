import DealsCard from './DealsCard';
import { parseISOString } from '../App';
import EProfile from './EProfile';
import { get, child, set, ref, getDatabase } from 'firebase/database'

export default function EDeals(props) {

    const [profile, setProfile] = useState(null)
    const [dbState, setDbState] = useState({})
    const [deals, setDeals] = useState([])

    let { auth } = props;
    let today = new Date();
    //get all deals
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/')).then((snapshot) => {
      if (snapshot.exists()) {
          setDbState(snapshot.val());
          //add ids
          let deals2 = dbState.entertainment;
          for(const key of Object.keys(deals2).values())
          {
            if(deals2[key].deals != undefined)
            {
              for(const deal in deals2[key].deals)
              {
                  deals2[key].deals[deal]['id'] = key;
              } 
            }
          }

          let deals3 = Object.values(deals2).map(x => x.deals).flat().filter(x => x != undefined);

          //sort by ascending time - return first few after current end date
          setDeals(deals3.filter(x => parseISOString(x.end) >= today).sort((a, b) => parseISOString(a.start) - parseISOString(b.start)));
      }
    });

    return(
      (profile != null ? 
      <View>
           <Button onPress={() => {
          setProfile(null);
          }
        }
          title="Back" />
        <EProfile info={profile} auth={auth}/>
        </View>
        :
        deals.length == 0 ?  
        <View style={styles.container}>
            <Text>No deals - come back later!</Text>
        </View>
        : <View style={styles.container}>
             <FlatList style={{flex: 1}}
          data={deals.slice(0, 9)}
          renderItem={({item}) => 
          <Pressable onPress={() => {
            console.log(dbState.entertainment[item.id])
            setProfile(dbState.entertainment[item.id]);
          }}>
            <DealsCard deal={item}/>
          </Pressable>
          }
          keyExtractor={item => item.id}
        />
        </View>    
      )   
    );
}