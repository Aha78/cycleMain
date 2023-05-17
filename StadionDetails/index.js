import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import axios from 'axios';
import * as React from 'react';
import { useState } from "react";
import { Card } from 'react-native-elements';
import { DataTable } from 'react-native-paper';

const StadionDetails = ({ navigation, route }) => {
    const [details, Setdetails] = useState(null);

    axios.get("http://192.168.1.2:7077/api/stationdetails?id=" + route.params.name)
        .then(resp => resp.data)
        .then(resp => details == null ? Setdetails(resp) : resp)
        .catch(resp => console.log(resp));

    if (details != null) {
        return <View>
            <Text style={[styles.setFontSize]}>Stationdetails </Text>

            <Card>
                <DataTable>
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
export default StadionDetails;

const styles = StyleSheet.create({
    cellSize: {

        fontSize: 16,
        fontWeight: 'bold'
    },

    setFont: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10
    },
    setFontSize: {
        fontSize: 32,
        fontWeight: 'bold'
    }
});