import { StyleSheet, Text, View,FlatList,Button ,TouchableHighlight} from "react-native";
import { Router, Route, Link } from "./react-router";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react"; 
import { Icon } from 'react-native-elements';
import { DataTable } from 'react-native-paper';


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
    const [page, SetPage] = useState(1);
    axios.get("http://192.168.1.2:7077/api/Stations?page=" + page)

        .then(resp => resp.data)
        .then(resp => Setadvice(resp))
        
        .catch(resp=>console.log(resp));



 

    if (advice != null) {
        return (
            <View>
                <FlatList
                    data={advice}
                    renderItem={({ item }) => <TouchableHighlight onPress={() => navigation.navigate('StationDetails', { name: item.id })}><Text >{item.Name}</Text></TouchableHighlight>}
                    keyExtractor={item => item.id}
                />
                <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                

                    <TouchableHighlight onPress={() => SetPage(page>0?page:page1)}>
                        <Icon
                            name='arrow-left' size={80} />
                    </TouchableHighlight>
                    <Text>{ page} </Text>
                    <TouchableHighlight onPress={() => SetPage(page + 1)} >
                        <Icon
                            name='arrow-right' size={80} />
                    </TouchableHighlight>
                </View>

           

            </View>

        );

    }
    else return (
        <View>

        </View>

    );



};
const StadionDetails = ({ navigation, route }) => {
    const [details, Setdetails] = useState(null);

    axios.get("http://192.168.1.2:7077/api/stationdetails?id=" + route.params.name)

        .then(resp => resp.data)
        .then(resp => Setdetails(resp))
        .catch(resp => console.log(resp));
    
    if (details != null) {
        return <View>
            <Text>Stationdetails </Text>


            <DataTable style={styles.container}>
                
                <DataTable.Row>
                    <DataTable.Cell>Station's name</DataTable.Cell>
                    <DataTable.Cell>{details.Name}</DataTable.Cell>
                  
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Station's address</DataTable.Cell>
                    <DataTable.Cell>{details.Address}</DataTable.Cell>
                    
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>debarture journeys</DataTable.Cell>
                    <DataTable.Cell>{details.NumDeb}</DataTable.Cell>
          
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>returns journeys </DataTable.Cell>
                    <DataTable.Cell>{details.NumEnd}</DataTable.Cell>

                </DataTable.Row>
          
            </DataTable>
           
        </View>;
    }
    else return (
        <View>

        </View>

    );
};
export default MyStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       padding: 15
    },

    tableHeader: {
        backgroundColor: '#DCDCDC',
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