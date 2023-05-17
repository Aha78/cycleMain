import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main/index.js';
import Map from './Map/index.js';
import StadionDetails from './StadionDetails/index.js';
import Journeys from './Journeys/index.js';


const Stack = createNativeStackNavigator();


const MyStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: 'Stationlist' }}
                />
                <Stack.Screen
                    name="Journeys"
                    component={Journeys}
                    options={{ title: 'Journeys' }}
                />

                <Stack.Screen
                    name="Map"
                    component={Map}
                    options={{ title: 'Map' }}
                />
                <Stack.Screen name="StationDetails" component={StadionDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;
