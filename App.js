import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // Container View 가 Flex Container
    // Flex Direction 기본값은 모두 Column
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, backgroundColor: "red" }}></View>
      <View style={{ flex: 3, backgroundColor: "orange" }}></View>
      <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
