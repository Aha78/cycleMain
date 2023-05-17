
import { StyleSheet, Text, View, FlatList,TouchableHighlight } from "react-native";
import axios from 'axios';
import { useState } from "react";
import { Icon, Card } from 'react-native-elements';



const Main = ({ navigation }) => {
    const [advice, Setadvice] = useState(null);
    const [page, SetPage] = useState(1);
    axios.get("http://192.168.1.2:7077/api/Stations?page=" + page)
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,

    },
});
export default Main;