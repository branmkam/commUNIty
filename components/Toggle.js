import { Switch } from "react-native";

export default function Toggle(props) { 

    const {r, setR} = props;
    const toggleSwitch = () => setR(previousState => !previousState);
    return(
    <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={r ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={r}
    />
    )
}