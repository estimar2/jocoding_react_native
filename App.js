import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

import { API_KEY } from "@env";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);
  const [city, setCity] = useState("Loading");

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    // 경도, 위도 찾기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    // 경도, 위도로 주소 찾기
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      {
        useGoogleMaps: false,
      },
    );

    setCity(location[0].city);

    // 경도, 위도로 날씨 찾기
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );

    const { list } = await response.json();
    // console.log(list, ">> list");

    const filertData = list.filter(data => {
      data.dt_txt.includes("00:00:00");

      return data;
    });

    // console.log(filertData, ">> filertData")

    setDays(filertData);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    // Container View 가 Flex Container
    // Flex Direction 기본값은 모두 Column
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled
        horizontal
        // indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 200 }} />
          </View>
        ) : (
          days.map((data, idx) => (
            <View key={idx} style={styles.day}>
              <View style={styles.day}>
                <Text style={styles.temp}>
                  {parseFloat(data.main.temp.toFixed(1))}
                </Text>
                <Text style={styles.description}>{data.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {data.weather[0].description}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e228",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
