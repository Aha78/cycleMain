import { StyleSheet, Text, View, FlatList, TouchableHighlight } from "react-native";
import axios from 'axios';
import * as React from 'react';
import { useState } from "react";
import { Icon, Card } from 'react-native-elements';


const Journeys = ({ }) => {
    const [advice, Setadvice] = useState(null);
    const [page, SetPage] = useState(1);
    axios.get("http://192.168.1.2:7077/api/Journeys?page=" + page)
        .then(resp => resp.data)
        .then(resp => advice == null ? Setadvice(resp) : resp)
        .catch(resp => console.log(resp));

    if (advice != null) {
        return (
            <View>
                <View style={[styles.container]}>
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
                            <View style={[styles.container]}>

                                <Text style={{ margin: 10 }}>
                                    Start   {item.start}
                                </Text>
                                <Text style={{ textAlign: 'right' }}>
                                    End {item.end}
                                </Text>
                            </View>
                            <View style={[styles.container]}>
                                <Text style={{ textAlign: 'left' }}>
                                    Duration {item.duration}
                                </Text>
                                <Text style={{ textAlign: 'left' }}>
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

export default Journeys;
const styles = StyleSheet.create({
    container: 
    {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});