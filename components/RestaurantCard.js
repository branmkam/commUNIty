import { View, Text, Button } from 'react-native'

export const RestaurantCard = props => {
    return(
        // <View style={cardstyle.container}>
            <Text>{props.name}</Text>
        //<Text>{props.address}</Text></View> */}
    )
}

const cardstyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        padding: 20,
        backgroundColor: '#fff',
        color: '#333',
    },
  });