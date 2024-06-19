import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // Container View 가 Flex Container
    // Flex Direction 기본값은 모두 Column
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>대전</Text>
      </View>

      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.discription}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e228",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  discription: {
    marginTop: -30,
    fontSize: 60,
  },
});
