import { StatusBar } from "expo-status-bar";
// 자체적으로 packages와 APIs를 만들기 시작함 = Expo SDK
// Expo가 제공하는 StatusBar는 React Native 에서 제공하는 StatusBar 랑 같음
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // 1. div 말고 View 사용
    // 2. 모든 텍스트는 text component 안에 있어야함
    // 3. StyleSheet.create 사용

    <View style={styles.container}>
      <Text style={styles.text}>Hooooo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
