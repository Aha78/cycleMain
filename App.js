import { StyleSheet, Text, View,FlatList,Button ,TouchableHighlight} from "react-native";
import { Router, Route, Link } from "./react-router";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react"; 
import { Icon } from 'react-native-elements'

//demo, which I use as template to app
// https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();







const MyStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Stationlist' }}
                />
                <Stack.Screen name="StationDetails" component={StadionDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const Home =  ({ navigation }) => {
    const [advice, Setadvice] = useState(null);
    axios.get("http://192.168.1.3:7077/api/Stations?page=1")

        .then(resp => resp.data)
        .then(resp => Setadvice(resp))
        
        .catch(resp=>console.log(resp));

    state = {
        Data: 'This is a text component, created using state data. It will change or updated on clicking it.'
    }  

 

    if (advice != null) {
        return (
            <View>
                <FlatList
                    data={advice}
                    renderItem={({ item }) => <TouchableHighlight onPress={() => alert('jes')}><Text >{item.Name}</Text></TouchableHighlight>}
                    keyExtractor={item => item.id}
                />
                <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                

                    <TouchableHighlight onPress={() => alert('jes')}>
                        <Icon
                            name='arrow-left' size={80} />
                    </TouchableHighlight>
                    <Text>1</Text>
                    <TouchableHighlight onPress={() => alert('jes1')} >
                        <Icon
                            name='arrow-right' size={80} />
                    </TouchableHighlight>
                </View>

                <Button
                    title="Stations details"
                    onPress={() =>
                        navigation.navigate('StationDetails', { name: '1' })
                    }
                />

            </View>

        );

    }
    else return (
        <View>

        </View>

    );



};
const StadionDetails = ({ navigation, route }) => {

    return <View>
        <Text>Stationdetails</Text>
        <Text>Station's name</Text>
        <Text>Station's address</Text>
        <Text>Station's total number of debarture journeys</Text>
        <Text>Station's total number of returns journeys</Text>
        <Text>This is {route.params.name}'s profile</Text>
        
        </View>;
};
export default MyStack;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });