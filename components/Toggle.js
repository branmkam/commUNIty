import { Switch } from "react-native";

export default function Toggle(props) { 

    const {r, setR} = props;
    const toggleSwitch = () => setR(previousState => !previousState);
    return(
    <Switch
        trackColor={{false: '#866ca1', true: '#7BAFD4'}}
        thumbColor={r ? '#866ca1' : '#7BAFD4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={r}
    />
    )
}