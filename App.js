import { StyleSheet, Text, View,FlatList,Button ,TouchableHighlight} from "react-native";
import { Router, Route, Link } from "./react-router";
import { useLocation } from 'react-router-dom'

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from 'react-native-elements'

//demo, which I use as template to app
// https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  

  


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
        <View>
      <FlatList
        data={DATA}
        renderItem={({item}) =><Text >{item.title}</Text>}
        keyExtractor={item => item.id}
      />
 <View style={{flexGrow: 1,  flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
<TouchableHighlight  onPress={()=>alert('jes')}>
<Icon
  name='arrow-left'size={80} />
  </TouchableHighlight>
  <Text>3</Text>
  <TouchableHighlight onPress={()=>alert('jes1')} >
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