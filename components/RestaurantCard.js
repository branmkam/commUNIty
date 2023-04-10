import { Card, Text, Button, TextInputComponent } from 'react-native'

export const RestaurantCard = props => {
    return(
        <View style={cardstyle.container}>
            <Text>{props.name}</Text>
            <Text>{props.address}</Text>
        </View>
    )
}

const cardstyle = StyleSheet.create({
    container: {
      flex: 1,
      height: '150px',
      width: '90%',
      backgroundColor: '#fff',
      color: '#333',
    },
  });