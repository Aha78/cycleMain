import { StyleSheet, Text, View,FlatList } from "react-native";
import { Router, Route, Link } from "./react-router";

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
const Home = () =>
    <View style={styles.container}>
    <FlatList
        data={[
            { key: 'Android' }, { key: 'iOS' }, { key: 'Java' }, { key: 'Swift' }
         
        ]}
        renderItem={({ item }) =>
                <Link to="/stationDetails"><Text style={styles.item}>{item.key}</Text></Link>}
        ItemSeparatorComponent={this.renderSeparator}
    />
</View>;
const StationDetails = () =>
    <View style={styles.container}>
        <Text>StationDetails</Text>
        <Text>Station name</Text>
        <Text>Total number of debarting journeys</Text>
        <Text>Total number of return journeys</Text>
        <Text>Map</Text>
    </View>;

const About = () => <Text>A</Text>;
const Test = () => <Text>B</Text>;
const App = () => (
  <Router>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/">
          <Text>Stationlist</Text>
        </Link>
       <Link to="/stationDetails">
           <Text>Stationdetails</Text>
        </Link>
      </View>

      <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/test" component={Test} />
            <Route path="/stationDetails" component={StationDetails} />
    </View>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
