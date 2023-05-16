import { StyleSheet, Text, View, FlatList, Button,Dimensions,TouchableHighlight} from "react-native";
import { Router, Route, Link } from "./react-router";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react"; 
import { Icon, Card } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

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

const Map = ({route }) => {
    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE = route.params.lat;
    const LONGITUDE = route.params.lon;
    const LATITUDE_DELTA = 0.0222;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 2;

    this.state = {
        region: {
            latitude: route.params.lat - LATITUDE_DELTA/2 ,
            longitude: route.params.lon ,
            latitudeDelta: LATITUDE_DELTA + LATITUDE_DELTA/2,
            longitudeDelta: LONGITUDE_DELTA + LONGITUDE_DELTA,
        },
        markers: [],
    };

    return  (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={this.state.region} >
                <Marker coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}
                    pinColor={"red"} 
                    />
            </MapView>
        </View>)
}

const Journeys = ({  }) => {
    const [advice, Setadvice] = useState(null);
    const [page, SetPage] = useState(1);
    axios.get("http://192.168.1.2:7077/api/Journeys?page=" + page)

        .then(resp => resp.data)
        .then(resp => advice==null ? Setadvice(resp) : resp)
        .catch(resp => console.log(resp));

    if (advice != null) {
        return (
            <View>
                <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                    <TouchableHighlight onPress={() => {
                        Setadvice(null);
                        SetPage((page - 1) > 0 ? page - 1 : page);
                    }
                    }>
                        <Icon
                            name='arrow-left' size={80} />
                    </TouchableHighlight>
                    <Text>{page} </Text>
                    <TouchableHighlight onPress={() => {
                        Setadvice(null);
                        SetPage(page + 1);
                    }}>
                        <Icon
                            name='arrow-right' size={80} />
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={advice}
                    renderItem={({ item }) =>
                        
                    <Card>
                        <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={{ margin: 10 }}>
                                  Start   { item.start}
                            </Text>
                            <Text style={{ textAlign: 'right'}}>
                                   End {item.end}
                            </Text>
                            </View>
                            <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'left' }}>
                                    Duration {item.duration}
                                </Text>
                                <Text style={{  textAlign: 'left' }}>
                                    Distance {item.distance}
                                </Text> 
                            </View>

                            </Card>
                
                }
                    keyExtractor={item => item.id}
                />
            </View>
        );

    }
    else return (
        <View>

        </View>

    );
}
const Home =  ({ navigation }) => {
    const [advice, Setadvice] = useState(null);
    const [page, SetPage] = useState(1);
    axios.get("http://192.168.1.2:7077/api/Stations?page=" + page)
        .then(resp => resp.data)
        .then(resp => advice==null?Setadvice(resp):resp)
        .catch(resp=>console.log(resp));

    if (advice != null) {
        return (
            <View>
                <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableHighlight onPress={() => {

                        Setadvice(null);
                        SetPage((page - 1) > 0 ? page - 1 : page);
                    }}>
                        <Icon
                            name='arrow-left' size={80} />
                    </TouchableHighlight>
                    <Text style={[styles.setFontSize]}>{page} </Text>
                    <TouchableHighlight onPress={() => {
                        Setadvice(null);
                        SetPage(page + 1);

                    }
                    } >
                        <Icon
                            name='arrow-right' size={80} />
                    </TouchableHighlight>
                </View>

                <FlatList
                    data={advice}
                    renderItem={({ item }) => <Card><TouchableHighlight onPress={() => navigation.navigate('StationDetails', { name: item.id })}><Text
                        style={[styles.setFont]}>{item.Name}</Text></TouchableHighlight></Card>}
                    keyExtractor={item => item.id}
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
    const [details, Setdetails] = useState(null);

    axios.get("http://192.168.1.2:7077/api/stationdetails?id=" + route.params.name)
        .then(resp => resp.data)
        .then(resp => details==null? Setdetails(resp) :resp)
        .catch(resp => console.log(resp));
    
    if (details != null) {
        return <View>
            <Text style={[styles.setFontSize]}>Stationdetails </Text>
          
            <Card style={[styles.setFontSize, styles.setColorPink]}>

                <DataTable >
                
                <DataTable.Row>
                        <DataTable.Cell><Text style={[styles.cellSize]}>Station's name</Text></DataTable.Cell>
                    <DataTable.Cell>{details.Name}</DataTable.Cell>
                  
                </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={[styles.setFontSize]}><Text style={[styles.cellSize]}>Station's address</Text></DataTable.Cell>
                    <DataTable.Cell>{details.Address}</DataTable.Cell>
                    
                </DataTable.Row>                            
                    <DataTable.Row>
                        <DataTable.Cell><Text style={[styles.cellSize]}>debarture journeys</Text></DataTable.Cell>
                    <DataTable.Cell>{details.NumDeb}</DataTable.Cell>
          
                </DataTable.Row>
                <DataTable.Row>
                        <DataTable.Cell><Text style={[styles.cellSize]}>returns journeys</Text></DataTable.Cell>
                    <DataTable.Cell>{details.NumEnd}</DataTable.Cell>

                </DataTable.Row>
          
            </DataTable>
            </Card>

            <TouchableHighlight onPress={() => navigation.navigate('Journeys')} >
                <Text style={[styles.cellSize]}>Journeys</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => navigation.navigate('Map', { lat: details.Lat, lon: details.Lon })} >
                <Text style={[styles.cellSize]}>Map</Text>
            </TouchableHighlight>
            
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
    map: {
        width: '100%',
        height: '100%',
    },

    height: {
       
        height: '200px',
    },
        cellSize: {

            fontSize: 16,
            fontWeight: 'bold'
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

    setFont: {
        fontSize: 25,
        fontWeight: 'bold',
        margin : 10
    },
    setFontSize: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    setColorRed: {
        color: '#f44336'
    },
    setColorPink: {
        color: '#e91e63'
    },
    setColorPurple: {
        color: '#9c27b0'
    },
    setColorBlue: {
        color: '#2196f3'
    },
  });