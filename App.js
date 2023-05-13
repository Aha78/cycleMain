import { StyleSheet, Text, View,FlatList,Button } from "react-native";
import { Router, Route, Link } from "./react-router";
import { useLocation } from 'react-router-dom'

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="StationDetails" component={StadionDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const Home = ({ navigation }) => {
    return (
        <Button
            title="Stations details"
            onPress={() =>
                navigation.navigate('StationDetails', { name: '1' })
            }
        />
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