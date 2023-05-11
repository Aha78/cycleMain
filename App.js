import { StyleSheet, Text, View } from "react-native";
import { Router, Route, Link } from "./react-router";

const Home = () => <Text>Home</Text>;
const Antto = () => <Text>Antto</Text>;
const About = () => <Text>A</Text>;
const Test = () => <Text>B</Text>;
const App = () => (
  <Router>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/">
          <Text>Stationlist</Text>
        </Link>
                <Link to="/test">
                    <Text>Stationdetails</Text>
        </Link>
      </View>

      <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/test" component={Test} />
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
