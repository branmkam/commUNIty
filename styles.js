import { StyleSheet } from 'react-native';

export const styles =
    StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    card: {
      flex: 1,
      flexDirection: 'row',
      margin: 5, 
    },
    imgs: {
      
    },
    info: {
      padding: 10,
    },
    businessTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    topbar: {
      display: 'inline',
      marginTop: 40,
      height: 40,
    },
    businessRating: {
      position: 'absolute',
      right: 0,
      bottom: 5,
      fontWeight: 'bold',
      fontSize: 16,
    },
    input: {
      backgroundColor: '#eee',
      color: '#000',
      borderRadius: 10,
      border: '1px solid #333',
      paddingLeft: 5,
      padding: 1,
      paddingRight: 5,
    },
    buttonsView: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: true,
    },
    selectorButton: {
      margin: 2,
      backgroundColor: "#ddd",
      border: '2px solid #333',
      borderRadius: 10,
      color: '#333',
      width: '20%'
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    faveStar: {
      position: 'absolute',
      right: 0,
      bottom: 30,
      width: 20,
      height: 20,
    }
});
  
  