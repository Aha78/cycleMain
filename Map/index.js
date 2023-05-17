
import { StyleSheet, View,  Dimensions } from "react-native";

import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ route }) => {
    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE = route.params.lat;
    const LONGITUDE = route.params.lon;
    const LATITUDE_DELTA = 0.0222;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 2;

    this.state = {
        region: {
            latitude: route.params.lat - LATITUDE_DELTA / 2,
            longitude: route.params.lon,
            latitudeDelta: LATITUDE_DELTA + LATITUDE_DELTA / 2,
            longitudeDelta: LONGITUDE_DELTA + LONGITUDE_DELTA,
        },
        markers: [],
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={this.state.region} >
                <Marker coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}
                    pinColor={"red"}
                />
            </MapView>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15

    },
    map: {
        width: '100%',
        height: '100%',
    },

});
export default Map;